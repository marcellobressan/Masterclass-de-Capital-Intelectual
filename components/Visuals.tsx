import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { ArrowRight, RefreshCw, Users, Building2, Globe } from 'lucide-react';
import { IC_COMPONENTS_DATA, SECI_DATA } from '../constants';

// --- Section 2 Visuals ---

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

export const ComponentsChart = () => {
  const data = [
    { name: 'Humano', value: 40 },
    { name: 'Estrutural', value: 30 },
    { name: 'Relacional', value: 30 },
  ];

  return (
    <div className="h-64 w-full bg-white rounded-xl shadow-sm border border-slate-100 p-4">
      <h3 className="text-sm font-semibold text-slate-500 mb-2 text-center uppercase tracking-wider">A Composição de Valor</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ComponentCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {IC_COMPONENTS_DATA.map((item, idx) => (
        <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-3">
             {idx === 0 && <Users className="w-6 h-6 text-blue-500" />}
             {idx === 1 && <Building2 className="w-6 h-6 text-green-500" />}
             {idx === 2 && <Globe className="w-6 h-6 text-amber-500" />}
             <h3 className="font-bold text-lg text-slate-800">{item.name}</h3>
          </div>
          <p className="text-sm text-slate-600 mb-3">{item.description}</p>
          <div className="text-xs font-bold text-slate-500 uppercase mb-2">Indicadores Chave:</div>
          <ul className="text-sm space-y-1 text-slate-700">
            {item.indicators.slice(0,3).map((ind, i) => (
              <li key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></div>
                <span>{ind}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// --- Section 3 Visuals ---

export const SECIMatrix = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mt-8">
      {SECI_DATA.map((item, idx) => (
        <div key={idx} className={`relative p-6 rounded-xl border-l-4 shadow-sm ${item.color}`}>
          <div className="absolute top-4 right-4 opacity-20">
            <RefreshCw size={40} />
          </div>
          <h3 className="font-bold text-lg mb-1">{item.mode}</h3>
          <div className="flex items-center text-xs font-semibold uppercase tracking-wider mb-3 opacity-75">
            {item.from} <ArrowRight size={12} className="mx-1"/> {item.to}
          </div>
          <p className="text-sm mb-3 font-medium opacity-90">{item.desc}</p>
          <div className="bg-white/50 p-2 rounded text-xs italic">
            " {item.example} "
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Section 4 Visuals ---

export const MarketVsBookChart = () => {
  const data = [
    { name: 'Empresa Tradicional', BookValue: 80, IntangibleValue: 20 },
    { name: 'Empresa do Conhecimento', BookValue: 30, IntangibleValue: 120 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-bold text-slate-800 mb-4">A Lacuna de Avaliação</h3>
      <p className="text-slate-600 text-sm mb-6">
        Comparando Valor Contábil (Tangível) vs. Valor de Mercado (Total). A diferença é o Capital Intelectual.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
            <Tooltip />
            <Legend />
            <Bar dataKey="BookValue" stackId="a" fill="#94a3b8" name="Valor Contábil (Tangível)" />
            <Bar dataKey="IntangibleValue" stackId="a" fill="#3b82f6" name="Capital Intelectual (Intangível)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const ScorecardVisual = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-2">Perspectiva Financeira</h4>
                <p className="text-xs text-slate-600">Como somos vistos pelos acionistas?</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-900 mb-2">Perspectiva do Cliente</h4>
                <p className="text-xs text-amber-800">Como os clientes nos veem? (Capital Relacional)</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-900 mb-2">Processos Internos</h4>
                <p className="text-xs text-green-800">Em que devemos ser excelentes? (Capital Estrutural)</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-2">Aprendizado e Crescimento</h4>
                <p className="text-xs text-blue-800">Podemos continuar a melhorar? (Capital Humano)</p>
            </div>
        </div>
    )
}
