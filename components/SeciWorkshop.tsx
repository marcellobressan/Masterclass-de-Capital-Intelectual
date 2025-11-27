import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Save, RotateCcw, PenTool, CheckCircle2, Sparkles, Lightbulb, Loader2, AlertCircle, Users, MessageSquare, Monitor, Hammer } from 'lucide-react';
import { SECI_WORKSHOP_STEPS } from '../constants';
import { GoogleGenAI } from "@google/genai";

const SeciWorkshop = () => {
  const [step, setStep] = useState(0); // 0 = Intro, 1-4 = Steps, 5 = Summary
  const [industry, setIndustry] = useState('');
  
  // Standardized options for consistency
  const BA_OPTIONS = [
    { label: 'Físico (Presencial)', desc: 'Face-a-face, informal', icon: Users },
    { label: 'Diálogo (Reunião)', desc: 'Workshops, fóruns', icon: MessageSquare },
    { label: 'Virtual (Sistemas)', desc: 'Email, Intranet, Bases', icon: Monitor },
    { label: 'Prático (Contexto)', desc: 'On-the-job, simulação', icon: Hammer }
  ];

  const [answers, setAnswers] = useState({
    socialization: { activity: '', ba: BA_OPTIONS[0].label },
    externalization: { activity: '', ba: BA_OPTIONS[1].label },
    combination: { activity: '', ba: BA_OPTIONS[2].label },
    internalization: { activity: '', ba: BA_OPTIONS[3].label }
  });

  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  
  // New state for final plan analysis
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    const stepKey = SECI_WORKSHOP_STEPS[step - 1].id;
    setAnswers(prev => ({
      ...prev,
      [stepKey]: { ...prev[stepKey as keyof typeof prev], [field]: value }
    }));
    if (field === 'activity') setAiError(null); // Clear error on typing
  };

  const nextStep = () => {
    setStep(s => Math.min(s + 1, 5));
    setAiError(null);
  };
  
  const prevStep = () => {
    setStep(s => Math.max(s - 1, 0));
    setAiError(null);
  };
  
  const reset = () => {
    setStep(0);
    setIndustry('');
    setAnswers({
        socialization: { activity: '', ba: BA_OPTIONS[0].label },
        externalization: { activity: '', ba: BA_OPTIONS[1].label },
        combination: { activity: '', ba: BA_OPTIONS[2].label },
        internalization: { activity: '', ba: BA_OPTIONS[3].label }
    });
    setAnalysis(null);
    setAiError(null);
  };

  // AI Functionality
  const generateAiContent = async (type: 'suggest' | 'refine') => {
    setAiError(null);

    // Security check: Ensure API key is loaded from environment
    if (!process.env.API_KEY) {
        setAiError("Chave de API não detectada no ambiente. Configure process.env.API_KEY.");
        return;
    }

    setIsAiLoading(true);
    const currentStepData = SECI_WORKSHOP_STEPS[step - 1];
    const currentAnswer = answers[currentStepData.id as keyof typeof answers];
    const context = industry ? `para uma organização do tipo: "${industry}"` : "para uma organização genérica";

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    let prompt = "";
    
    if (type === 'suggest') {
        prompt = `Atue como um consultor especialista em Gestão do Conhecimento e Modelo SECI.
        Sugira uma atividade prática, criativa e eficaz para a etapa de "${currentStepData.title}" (${currentStepData.sub}) ${context}.
        A sugestão deve ser curta (máximo 2 frases) e direta, focada em gerar "${currentStepData.outcome}".
        Responda apenas com o texto da atividade.`;
    } else {
        prompt = `Atue como um consultor especialista em Gestão do Conhecimento.
        Melhore e refine a seguinte descrição de atividade para a etapa de "${currentStepData.title}" do modelo SECI:
        "${currentAnswer.activity}"
        O objetivo é torná-la mais acionável, específica e profissional ${context}.
        Mantenha o texto conciso (máximo 3 frases). Responda apenas com o texto melhorado.`;
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        const text = response.text;
        if (text) {
            handleInputChange('activity', text.trim());
        }
    } catch (error) {
        console.error("Erro na IA:", error);
        setAiError("Erro ao conectar com a IA. Tente novamente.");
    } finally {
        setIsAiLoading(false);
    }
  };

  const generateAnalysis = async () => {
    setAiError(null);

    if (!process.env.API_KEY) {
        setAiError("Chave de API não detectada.");
        return;
    }
    
    setIsAnalyzing(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Atue como um estrategista sênior de Gestão do Conhecimento.
    Analise o seguinte Plano de Aprendizagem SECI criado para o contexto: "${industry || 'Geral'}".

    1. Socialização (Tácito-Tácito): ${answers.socialization.activity}
    2. Externalização (Tácito-Explícito): ${answers.externalization.activity}
    3. Combinação (Explícito-Explícito): ${answers.combination.activity}
    4. Internalização (Explícito-Tácito): ${answers.internalization.activity}

    Forneça um feedback executivo (máximo 200 palavras) avaliando a coerência do ciclo.
    Destaque se há um fluxo lógico de conhecimento e sugira um ponto de melhoria para garantir que a espiral de conhecimento seja efetiva.
    Use tom profissional e construtivo.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        setAnalysis(response.text || "Sem resposta da IA.");
    } catch (e) {
        console.error("Erro ao gerar análise", e);
        setAiError("Erro ao conectar com a IA para análise.");
    } finally {
        setIsAnalyzing(false);
    }
  };

  // Intro Screen
  if (step === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-slate-900 p-8 text-white text-center">
          <PenTool className="w-16 h-16 mx-auto mb-4 text-blue-400" />
          <h2 className="text-3xl font-bold mb-2">Workshop: Guia Prático SECI</h2>
          <p className="text-slate-300 max-w-xl mx-auto">
            Crie um plano de aprendizagem organizacional estruturado. Você definirá atividades para cada etapa da Espiral do Conhecimento.
          </p>
        </div>
        <div className="p-8">
            <h3 className="font-bold text-lg mb-4 text-slate-800">Objetivos do Exercício:</h3>
            <ul className="space-y-3 mb-8 text-slate-600">
                <li className="flex gap-3"><div className="bg-blue-100 p-1 rounded text-blue-600"><CheckCircle2 size={16}/></div> Identificar oportunidades de troca tácita.</li>
                <li className="flex gap-3"><div className="bg-green-100 p-1 rounded text-green-600"><CheckCircle2 size={16}/></div> Definir métodos de documentação.</li>
                <li className="flex gap-3"><div className="bg-amber-100 p-1 rounded text-amber-600"><CheckCircle2 size={16}/></div> Organizar e distribuir o conhecimento.</li>
                <li className="flex gap-3"><div className="bg-purple-100 p-1 rounded text-purple-600"><CheckCircle2 size={16}/></div> Planejar a aplicação prática.</li>
            </ul>

            <div className="mb-8 max-w-md mx-auto">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Qual o ramo da sua empresa/projeto? (Opcional)
                </label>
                <div className="relative">
                    <input 
                        type="text" 
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        placeholder="Ex: Startup de Software, Hospital, Escola..."
                        className="w-full p-3 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 bg-white placeholder-slate-400"
                    />
                    <Sparkles className="absolute left-3 top-3.5 text-slate-400 w-4 h-4" />
                </div>
                <p className="text-xs text-slate-500 mt-2 text-center">
                    Isso ajuda nossa IA a sugerir atividades mais relevantes para você.
                </p>
            </div>

            <div className="text-center">
                <button onClick={nextStep} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto shadow-lg shadow-blue-200">
                    Começar Guia <ArrowRight size={20} />
                </button>
            </div>
        </div>
      </div>
    );
  }

  // Summary Screen
  if (step === 5) {
    return (
      <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-12">
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm print:shadow-none print:border-none">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Seu Plano de Gestão do Conhecimento</h2>
                    {industry && <p className="text-sm text-slate-500 mt-1">Contexto: {industry}</p>}
                </div>
                <button onClick={reset} className="text-sm text-slate-500 hover:text-blue-600 flex items-center gap-1">
                    <RotateCcw size={14}/> Novo Plano
                </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
                {SECI_WORKSHOP_STEPS.map((s, i) => {
                    const data = answers[s.id as keyof typeof answers];
                    const colors = [
                        'border-blue-500 bg-blue-50',
                        'border-green-500 bg-green-50',
                        'border-amber-500 bg-amber-50',
                        'border-purple-500 bg-purple-50'
                    ];
                    return (
                        <div key={s.id} className={`p-5 rounded-lg border-l-4 ${colors[i]}`}>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-slate-800">{i+1}. {s.title}</h3>
                                <span className="text-xs uppercase font-semibold bg-white/50 px-2 py-1 rounded text-slate-600">{s.sub}</span>
                            </div>
                            <div className="mb-3">
                                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Atividade Planejada</span>
                                <p className="text-slate-800 font-medium">{data.activity || '(Não definida)'}</p>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Contexto (Ba)</span>
                                <p className="text-slate-700 text-sm">{data.ba}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* AI Strategic Analysis Section */}
            {analysis ? (
                <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100 animate-in fade-in">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="text-blue-600" size={20}/>
                        <h3 className="font-bold text-blue-900">Análise Estratégica (IA)</h3>
                    </div>
                    <div className="prose prose-sm text-blue-800 max-w-none whitespace-pre-line leading-relaxed">
                        {analysis}
                    </div>
                </div>
            ) : (
                <div className="mt-8 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-500 mb-4 text-sm">Obtenha um feedback profissional sobre a consistência do seu plano.</p>
                    <button 
                        onClick={generateAnalysis}
                        disabled={isAnalyzing}
                        className="bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 px-6 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        {isAnalyzing ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                        {isAnalyzing ? 'Analisando Estratégia...' : 'Gerar Análise de Coerência com IA'}
                    </button>
                    {aiError && (
                         <div className="text-xs text-red-600 flex items-center gap-1.5 mt-2">
                            <AlertCircle size={12} /> {aiError}
                        </div>
                    )}
                </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-100 text-sm text-slate-500 italic text-center">
                "Este ciclo contínuo transforma o know-how individual em ativos replicáveis, promovendo a inovação e o desenvolvimento contínuo da organização."
            </div>
        </div>
        <div className="flex justify-center">
            <button onClick={() => window.print()} className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 shadow-lg">
                <Save size={18} /> Salvar / Imprimir PDF
            </button>
        </div>
      </div>
    );
  }

  // Wizard Steps
  const currentStepData = SECI_WORKSHOP_STEPS[step - 1];
  const currentAnswer = answers[currentStepData.id as keyof typeof answers];
  
  // Validation: Check if activity has content (not just whitespace)
  const isStepValid = currentAnswer.activity && currentAnswer.activity.trim().length > 0;
  
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Visual Stepper */}
      <div className="mb-12 relative px-4">
          {/* Track Background */}
          <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200 -z-10"></div>
          {/* Active Track */}
          <div 
            className="absolute top-5 left-0 h-0.5 bg-blue-600 -z-10 transition-all duration-500"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>

          <div className="flex justify-between w-full">
            {SECI_WORKSHOP_STEPS.map((s, i) => {
                const index = i + 1;
                const isActive = step === index;
                const isCompleted = step > index;
                
                return (
                    <div key={s.id} className="flex flex-col items-center group cursor-default">
                        <div 
                            className={`
                                w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 bg-white
                                ${isActive ? 'border-blue-600 text-blue-600 shadow-lg scale-110 ring-4 ring-blue-50' : 
                                  isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                                  'border-slate-300 text-slate-500'}
                            `}
                        >
                            {isCompleted ? <CheckCircle2 size={20} /> : index}
                        </div>
                        <span className={`
                            mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors text-center max-w-[80px] sm:max-w-none
                            ${isActive ? 'text-blue-700' : isCompleted ? 'text-green-600' : 'text-slate-500'}
                        `}>
                            {s.title}
                        </span>
                    </div>
                )
            })}
          </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Educational Context */}
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 h-full">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{currentStepData.title}</h3>
            <div className="text-sm font-medium text-blue-600 mb-4 flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> {currentStepData.sub}
            </div>
            
            <div className="space-y-4 text-slate-600 leading-relaxed">
                <p><strong>Conceito:</strong> {currentStepData.concept}</p>
                <div className="bg-white p-4 rounded border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">O Conceito de Ba (Lugar)</p>
                    <p className="text-sm italic text-slate-700">{currentStepData.ba}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200">
                     <p className="text-sm font-semibold text-slate-800">Resultado Esperado:</p>
                     <p className="text-sm text-slate-600">{currentStepData.outcome}</p>
                </div>
            </div>
        </div>

        {/* Right: User Input */}
        <div className="flex flex-col h-full justify-between">
            <div className="space-y-6">
                <div className={`bg-white p-6 rounded-xl border shadow-sm transition-colors ${isStepValid ? 'border-blue-100' : 'border-slate-200'}`}>
                    <label className="block font-semibold text-slate-900 mb-2 flex justify-between items-center">
                        {currentStepData.question}
                        <div className="flex gap-2">
                            {!isStepValid && (
                                <span className="text-[10px] uppercase font-bold text-red-500 bg-red-50 px-2 py-1 rounded">
                                    Obrigatório
                                </span>
                            )}
                            {isStepValid && (
                                 <span className="text-[10px] uppercase font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                                    Preenchido
                                </span>
                            )}
                        </div>
                    </label>
                    
                    <textarea 
                        className={`
                            w-full p-3 border rounded-lg focus:ring-2 outline-none transition-all min-h-[120px] mb-2 text-slate-900 bg-white placeholder-slate-400
                            ${isStepValid 
                                ? 'border-slate-300 focus:ring-blue-500 focus:border-transparent' 
                                : 'border-slate-300 focus:border-red-300 focus:ring-red-100'}
                        `}
                        placeholder={`Descreva a atividade${industry ? ` para ${industry}` : ''}...`}
                        value={currentAnswer.activity}
                        onChange={(e) => handleInputChange('activity', e.target.value)}
                        disabled={isAiLoading}
                    ></textarea>

                    {/* AI Toolbar */}
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <button
                                onClick={() => generateAiContent('suggest')}
                                disabled={isAiLoading}
                                className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors disabled:opacity-50"
                            >
                                {isAiLoading ? <Loader2 size={12} className="animate-spin"/> : <Lightbulb size={12} />}
                                Sugerir Ideia
                            </button>
                            
                            {isStepValid && (
                                <button
                                    onClick={() => generateAiContent('refine')}
                                    disabled={isAiLoading}
                                    className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition-colors disabled:opacity-50"
                                >
                                    {isAiLoading ? <Loader2 size={12} className="animate-spin"/> : <Sparkles size={12} />}
                                    Aprimorar Texto
                                </button>
                            )}
                        </div>
                        
                        {/* Error Feedback */}
                        {aiError && (
                            <div className="text-xs text-red-600 flex items-center gap-1.5 bg-red-50 p-2 rounded animate-in fade-in">
                                <AlertCircle size={12} /> {aiError}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Selecione o Contexto (Ba):
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {BA_OPTIONS.map((opt) => (
                            <button
                                key={opt.label}
                                onClick={() => handleInputChange('ba', opt.label)}
                                className={`
                                    p-3 text-left rounded-lg border text-sm transition-all flex flex-col gap-1 h-full
                                    ${currentAnswer.ba === opt.label
                                        ? 'border-blue-500 bg-blue-50 text-blue-900 ring-1 ring-blue-500 shadow-sm' 
                                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'}
                                `}
                            >
                                <div className="flex items-center gap-2">
                                    <opt.icon size={16} className={currentAnswer.ba === opt.label ? 'text-blue-600' : 'text-slate-400'}/>
                                    <span className="font-semibold">{opt.label}</span>
                                </div>
                                <span className={`text-xs ${currentAnswer.ba === opt.label ? 'text-blue-700' : 'text-slate-400'}`}>
                                    {opt.desc}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-4 border-t border-slate-100">
                <button 
                    onClick={prevStep}
                    disabled={isAiLoading}
                    className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-2 px-4 py-2 disabled:opacity-50"
                >
                    <ArrowLeft size={18} /> Voltar
                </button>
                <button 
                    onClick={nextStep}
                    disabled={!isStepValid || isAiLoading}
                    title={!isStepValid ? "Preencha a atividade para continuar" : ""}
                    className={`
                        flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-white transition-all
                        ${!isStepValid || isAiLoading
                            ? 'bg-slate-300 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 shadow-md'}
                    `}
                >
                    {step === 4 ? 'Finalizar Plano' : 'Próxima Etapa'} <ArrowRight size={18} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SeciWorkshop;