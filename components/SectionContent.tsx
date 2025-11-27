import React from 'react';
import { SectionId } from '../types';
import { ComponentCards, ComponentsChart, SECIMatrix, MarketVsBookChart, ScorecardVisual } from './Visuals';
import { DISCLOSURE_THEORIES } from '../constants';
import { Quote, CheckCircle2, TrendingUp, Lightbulb, Building2 } from 'lucide-react';
import SeciWorkshop from './SeciWorkshop';

interface Props {
  activeSection: SectionId;
}

const SectionContent: React.FC<Props> = ({ activeSection }) => {

  const renderIntro = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">O Imperativo Estratégico da Economia do Conhecimento</h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Nós mudamos da Era Industrial para a <strong>Era do Conhecimento</strong>. 
          O recurso econômico mais significativo não é mais maquinário ou capital financeiro, mas <em>o próprio conhecimento</em>.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-slate-100 p-2 rounded-lg"><Building2 size={24} className="text-slate-600"/></div>
            <h3 className="text-xl font-bold text-slate-800">Era Industrial</h3>
          </div>
          <p className="text-slate-600">Valor gerado por ativos tangíveis: maquinário, propriedade e capital financeiro.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border-l-4 border-blue-500 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
             <div className="bg-blue-100 p-2 rounded-lg"><Lightbulb size={24} className="text-blue-600"/></div>
            <h3 className="text-xl font-bold text-slate-800">Era do Conhecimento</h3>
          </div>
          <p className="text-slate-600">Valor gerado por ativos intangíveis. Gerenciar este "Capital Intelectual" é uma necessidade estratégica central.</p>
        </div>
      </div>

      <div className="prose prose-slate max-w-none text-slate-700">
        <p>
          O verdadeiro valor de mercado de uma organização é cada vez mais determinado pelo seu capital intelectual (CI). 
          A lacuna significativa entre o valor contábil de uma empresa e sua avaliação de mercado é atribuída a esses ativos intangíveis.
          Esta aula explora como definir, gerenciar, mensurar e divulgar esse valor.
        </p>
      </div>
    </div>
  );

  const renderComponents = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900">Desconstruindo o Capital Intelectual</h2>
        <p className="text-slate-600 text-lg">
          Para gerenciar ativos intangíveis, precisamos categorizá-los. O Capital Intelectual (CI) é a soma de tudo que todos em uma empresa sabem que lhe confere uma vantagem competitiva.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-2/3">
           <ComponentCards />
        </div>
        <div className="w-full lg:w-1/3">
           <ComponentsChart />
           <p className="text-xs text-slate-500 mt-4 text-center italic">
             Ilustração: Como diferentes capitais contribuem para o valor total.
           </p>
        </div>
      </div>
    </div>
  );

  const renderProcesses = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">O Motor: Gestão do Conhecimento</h2>
        <p className="text-blue-800">
          Organizações não criam conhecimento; indivíduos criam. O papel da organização é amplificá-lo. 
          Isso requer a conversão entre dois tipos de conhecimento:
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg border border-slate-200">
            <h3 className="font-bold text-lg mb-2">Conhecimento Tácito</h3>
            <p className="text-sm text-slate-600">Subjetivo, "know-how" experiencial. Difícil de codificar. (ex: A intuição de um chef mestre)</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-slate-200">
            <h3 className="font-bold text-lg mb-2">Conhecimento Explícito</h3>
            <p className="text-sm text-slate-600">Codificado, formal. Fácil de compartilhar. (ex: A receita escrita)</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-slate-800 text-center mb-6">O Modelo SECI (A Espiral do Conhecimento)</h3>
        <SECIMatrix />
      </div>
    </div>
  );

  const renderMeasurement = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-slate-900">Mensurando o Intangível</h2>
        <p className="text-slate-600">
          A contabilidade tradicional falha em capturar o valor do CI. Precisamos de novos modelos para entender o "Valor Oculto".
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <MarketVsBookChart />
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <h3 className="text-lg font-bold text-slate-800 mb-4">Modelos de Mensuração</h3>
           
           <div className="space-y-6">
             <div>
                <h4 className="font-semibold text-blue-600 flex items-center gap-2">
                  <TrendingUp size={18}/> Market-to-Book Value (Mercado vs Contábil)
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  Cálculo simples: Valor de Mercado - Valor Contábil = Capital Intelectual. Bom para valor agregado, ruim para detalhes.
                </p>
             </div>
             
             <div>
                <h4 className="font-semibold text-blue-600 flex items-center gap-2">
                   <CheckCircle2 size={18}/> Navegador Skandia
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  Rastreia indicadores através das dimensões Financeira, Cliente, Humana e Estrutural.
                </p>
             </div>

             <div>
                <h4 className="font-semibold text-blue-600 flex items-center gap-2">
                   <CheckCircle2 size={18}/> Balanced Scorecard (BSC)
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  Traduz a estratégia em medidas de desempenho através de quatro perspectivas.
                </p>
                <ScorecardVisual />
             </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderDisclosure = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="bg-slate-900 text-slate-100 p-8 rounded-xl relative overflow-hidden">
        <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">A Estratégia da Transparência</h2>
            <p className="text-lg font-light text-slate-300">
            Por que contar ao mercado sobre seus ativos ocultos? É um movimento calculado para moldar a percepção e reduzir o custo de capital.
            </p>
        </div>
        <Quote className="absolute right-4 bottom-4 text-slate-800 w-32 h-32 rotate-12" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {DISCLOSURE_THEORIES.map((theory, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-400 transition-colors cursor-default">
            <h3 className="font-bold text-lg text-slate-800 mb-2">{theory.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{theory.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 text-amber-900 text-sm">
        <strong>Insight Empírico:</strong> Estudos mostram que grandes empresas divulgam mais (Teoria da Agência), e o Capital Humano é a categoria mais frequentemente divulgada. O Capital Estrutural é frequentemente mantido em segredo para manter a vantagem competitiva.
      </div>
    </div>
  );

  const renderConclusion = () => (
    <div className="max-w-3xl mx-auto text-center space-y-10 animate-in fade-in zoom-in duration-500 py-10">
      <h2 className="text-3xl font-bold text-slate-900">Vantagem Competitiva Sustentável</h2>
      
      <p className="text-lg text-slate-600 leading-relaxed">
        De acordo com a <strong>Visão Baseada em Recursos (RBV)</strong>, a vantagem vem de recursos que são valiosos, raros e difíceis de imitar.
        Maquinário pode ser comprado. <em>Cultura, relacionamentos e conhecimento tácito não podem.</em>
      </p>

      <div className="grid gap-4 max-w-lg mx-auto">
        <div className="bg-green-100 text-green-800 p-4 rounded-lg font-medium">
          Trate o Conhecimento como Ativo Principal
        </div>
        <div className="bg-blue-100 text-blue-800 p-4 rounded-lg font-medium">
          Gerencie Sistematicamente o Processo SECI
        </div>
        <div className="bg-purple-100 text-purple-800 p-4 rounded-lg font-medium">
          Meça e Divulgue para Atrair Capital
        </div>
      </div>

      <div className="pt-8 border-t border-slate-200">
        <p className="text-slate-500 italic">
          "O caminho definitivo para as empresas não apenas competirem, mas liderarem e inovarem."
        </p>
      </div>
    </div>
  );

  switch (activeSection) {
    case SectionId.INTRO: return renderIntro();
    case SectionId.COMPONENTS: return renderComponents();
    case SectionId.PROCESSES: return renderProcesses();
    case SectionId.SECI_WORKSHOP: return <SeciWorkshop />;
    case SectionId.MEASUREMENT: return renderMeasurement();
    case SectionId.DISCLOSURE: return renderDisclosure();
    case SectionId.CONCLUSION: return renderConclusion();
    default: return renderIntro();
  }
};

export default SectionContent;