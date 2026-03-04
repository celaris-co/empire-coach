import React from 'react'

export default function Test() {
  return (
    <div style={{
      background: '#0A0B0E',
      color: '#D4AF37',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
        ✅ EMPIRE COACH FONCTIONNE !
      </h1>
      <p style={{ fontSize: '24px', color: '#fff', marginBottom: '40px' }}>
        React est chargé et fonctionne correctement.
      </p>
      <div style={{
        background: 'rgba(212, 175, 55, 0.1)',
        border: '2px solid #D4AF37',
        borderRadius: '12px',
        padding: '30px',
        maxWidth: '600px'
      }}>
        <p style={{ fontSize: '18px', color: '#ccc', lineHeight: 1.6 }}>
          Si tu vois ce message, cela signifie que :
        </p>
        <ul style={{ textAlign: 'left', marginTop: '20px', color: '#10B981', fontSize: '16px' }}>
          <li style={{ marginBottom: '10px' }}>✅ Le serveur fonctionne</li>
          <li style={{ marginBottom: '10px' }}>✅ React est chargé</li>
          <li style={{ marginBottom: '10px' }}>✅ Vite build fonctionne</li>
          <li style={{ marginBottom: '10px' }}>✅ Ton navigateur charge le JS</li>
        </ul>
        <p style={{ fontSize: '16px', color: '#EF4444', marginTop: '30px', fontWeight: 'bold' }}>
          ➡️ Le problème vient donc du code de l'app, pas du setup.
        </p>
      </div>
    </div>
  )
}
