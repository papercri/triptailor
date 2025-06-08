'use client';

import { useState } from 'react';

type PackingAndBudgetProps = {
  destination: string;
};

export default function PackingAndBudget({ destination }: PackingAndBudgetProps) {
  const [days, setDays] = useState(7);
  const [season, setSeason] = useState('verano');
  const [travelerType, setTravelerType] = useState('aventurero');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/packing-budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, days, season, travelerType }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al generar la recomendación');
      } else {
        setResult(data.result);
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="packing-budget">
      <h2>¿Qué llevar y presupuesto para tu viaje a {destination}?</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Días de viaje:
          <input
            type="number"
            min={1}
            max={90}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          />
        </label>

        <label>
          Estación:
          <select value={season} onChange={(e) => setSeason(e.target.value)}>
            <option value="primavera">Primavera</option>
            <option value="verano">Verano</option>
            <option value="otoño">Otoño</option>
            <option value="invierno">Invierno</option>
          </select>
        </label>

        <label>
          Tipo de viajero:
          <select value={travelerType} onChange={(e) => setTravelerType(e.target.value)}>
            <option value="aventurero">Aventurero</option>
            <option value="relajado">Relajado</option>
            <option value="familiar">Familiar</option>
            <option value="negocios">Negocios</option>
          </select>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Generando...' : 'Generar recomendación'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div className="packing-budget__result" style={{ whiteSpace: 'pre-line', marginTop: '1em' }}>
          {result}
        </div>
      )}
    </section>
  );
}
