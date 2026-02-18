'use client';

export default function Progress({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <small>{label}</small>
      <div style={{ background: '#333', height: 8 }}>
        <div
          style={{
            width: `${value}%`,
            height: '100%',
            background: label === 'Fatiga' ? '#f55' : '#5f5',
          }}
        />
      </div>
    </div>
  );
}