import React, { useState } from 'react';
import { Check, Loader2, AlertCircle } from 'lucide-react';

const App = () => {
  const [lang, setLang] = useState('fr');
  const [step, setStep] = useState('captcha');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({
    project: '', sector: '', type: '', budget: '', rooms: '', surface: '',
    address: '', bedrooms: '', floor: '', totalFloors: '', hasBalcony: '',
    balconySize: '', hasTerrace: '', terraceSize: '', firstName: '',
    lastName: '', email: '', phone: '', comments: ''
  });

  const EMAILJS = {
    serviceId: 'service_bv78z9m',
    templateId: 'template_oeiicl5',
    publicKey: 'Ll690TMCQsN494dEP'
  };

  const t = {
    fr: {
      title: "Immobilier de prestige",
      subtitle: "Paris · Côte d'Azur · Deauville",
      intro: "Confiez-nous votre projet immobilier de prestige. Un conseiller expert vous contactera sous 24h.",
      captcha: "Je ne suis pas un robot",
      continue: "Continuer",
      question: "Quel est votre projet ?",
      estimate: "Obtenir une estimation",
      sell: "Vendre",
      buy: "Acheter",
      other: "Autre",
      sector: "Secteur souhaité",
      propertyType: "Type de bien",
      apartment: "Appartement",
      house: "Maison",
      building: "Immeuble",
      commercial: "Commerce",
      parking: "Parking",
      budget: "Budget",
      rooms: "Nombre de pièces",
      surface: "Surface souhaitée (m²)",
      address: "Adresse complète",
      bedrooms: "Chambres (facultatif)",
      floor: "Étage",
      totalFloors: "Étages total",
      hasBalcony: "Balcon ?",
      hasTerrace: "Terrasse ?",
      balconySize: "Surface balcon (m²)",
      terraceSize: "Surface terrasse (m²)",
      yes: "Oui",
      no: "Non",
      contactTitle: "Vos coordonnées",
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email",
      phone: "Téléphone",
      comments: "Commentaires (facultatif)",
      submit: "Envoyer",
      submitting: "Envoi...",
      thanks: "Merci pour votre confiance",
      thanksMsg: "Votre demande a été enregistrée.",
      next: "Les prochaines étapes :",
      step1: "Un conseiller vous contactera sous 24h",
      step2: "Analyse approfondie de votre projet",
      step3: "Accompagnement personnalisé",
      rgpd: "Vos données sont traitées confidentiellement.",
      visit: "Visiter notre site"
    },
    en: {
      title: "Prestige Real Estate",
      subtitle: "Paris · French Riviera · Deauville",
      intro: "Entrust us with your prestige real estate project. An expert will contact you within 24h.",
      captcha: "I'm not a robot",
      continue: "Continue",
      question: "What is your project?",
      estimate: "Get an estimation",
      sell: "Sell",
      buy: "Buy",
      other: "Other",
      sector: "Desired area",
      propertyType: "Property type",
      apartment: "Apartment",
      house: "House",
      building: "Building",
      commercial: "Commercial",
      parking: "Parking",
      budget: "Budget",
      rooms: "Rooms",
      surface: "Surface (m²)",
      address: "Full address",
      bedrooms: "Bedrooms (optional)",
      floor: "Floor",
      totalFloors: "Total floors",
      hasBalcony: "Balcony?",
      hasTerrace: "Terrace?",
      balconySize: "Balcony size (m²)",
      terraceSize: "Terrace size (m²)",
      yes: "Yes",
      no: "No",
      contactTitle: "Your details",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone",
      comments: "Comments (optional)",
      submit: "Submit",
      submitting: "Sending...",
      thanks: "Thank you",
      thanksMsg: "Your request has been registered.",
      next: "Next steps:",
      step1: "An advisor will contact you within 24h",
      step2: "In-depth analysis",
      step3: "Personalized support",
      rgpd: "Your data is processed confidentially.",
      visit: "Visit our website"
    }
  }[lang];

  const genHTML = () => {
    let h = `<div style="font-family:Arial;max-width:800px;margin:0 auto"><h2 style="color:#dc2626;border-bottom:2px solid #dc2626;padding-bottom:10px">Nouvelle demande</h2><h3>📋 Contact</h3><table style="width:100%;border-collapse:collapse;margin-bottom:30px">`;
    const add = (k, v) => v && (h += `<tr style="background:#f9fafb"><td style="padding:12px;border:1px solid #e5e7eb;font-weight:bold;width:200px">${k}</td><td style="padding:12px;border:1px solid #e5e7eb">${v}</td></tr>`);
    add('Prénom', data.firstName);
    add('Nom', data.lastName);
    add('Email', data.email);
    add('Téléphone', data.phone);
    h += '</table><h3>🏠 Projet</h3><table style="width:100%;border-collapse:collapse">';
    add('Projet', data.project);
    add('Secteur', data.sector);
    add('Type', data.type);
    add('Adresse', data.address);
    add('Budget', data.budget);
    add('Pièces', data.rooms);
    add('Chambres', data.bedrooms);
    add('Surface', data.surface);
    add('Étage', data.floor);
    add('Balcon', data.hasBalcony + (data.balconySize ? ` (${data.balconySize}m²)` : ''));
    add('Terrasse', data.hasTerrace + (data.terraceSize ? ` (${data.terraceSize}m²)` : ''));
    add('Commentaires', data.comments);
    return h + '</table></div>';
  };

  const sendEmail = async () => {
    try {
      setLoading(true);
      setError('');
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      await new Promise((ok, fail) => { s.onload = ok; s.onerror = fail; document.head.appendChild(s); });
      await new Promise(ok => setTimeout(ok, 500));
      if (!window.emailjs) throw new Error('EmailJS failed');
      window.emailjs.init(EMAILJS.publicKey);
      await window.emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, {
        to_email: 'amine.elmaanni@gmail.com',
        from_name: `${data.firstName} ${data.lastName}`,
        reply_to: data.email,
        message_html: genHTML()
      });
      setStep('thanks');
    } catch (e) {
      console.error(e);
      setError('Erreur. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
      setError('Champs obligatoires manquants');
      return;
    }
    sendEmail();
  };

  if (step === 'captcha') {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b">
          <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-light">{t.title}</h1>
              <p className="text-red-600 text-sm tracking-wider mt-1">{t.subtitle}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setLang('fr')} className={`px-4 py-2 rounded ${lang === 'fr' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>FR</button>
              <button onClick={() => setLang('en')} className={`px-4 py-2 rounded ${lang === 'en' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>EN</button>
            </div>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="bg-white p-8 rounded-lg shadow border inline-block">
              <button onClick={() => setStep('intro')} className="bg-red-600 text-white px-8 py-3 rounded hover:bg-red-700 flex items-center gap-2 mx-auto">
                <Check size={20} /> {t.captcha}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-light">{t.title}</h1>
            <p className="text-red-600 text-sm tracking-wider mt-1">{t.subtitle}</p>
          </div>
        </header>
        <main className="max-w-2xl mx-auto px-6 py-12 text-center space-y-8">
          <p className="text-gray-700 text-lg">{t.intro}</p>
          <button onClick={() => setStep('project')} className="bg-red-600 text-white px-10 py-4 rounded hover:bg-red-700 text-lg">{t.continue}</button>
        </main>
      </div>
    );
  }

  if (step === 'project') {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-light">{t.title}</h1>
          </div>
        </header>
        <main className="max-w-xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-light text-center mb-8">{t.question}</h2>
          <div className="grid gap-4">
            {[
              { key: 'Obtenir une estimation', label: t.estimate, next: 'sell-address' },
              { key: 'Vendre', label: t.sell, next: 'sell-address' },
              { key: 'Acheter', label: t.buy, next: 'buy-sector' },
              { key: 'Autre', label: t.other, next: 'contact' }
            ].map(p => (
              <button key={p.key} onClick={() => { setData({ ...data, project: p.key }); setStep(p.next); }} className="bg-white border-2 border-gray-200 p-6 rounded hover:border-red-600 text-left">
                {p.label}
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (step === 'buy-sector') {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-light">{t.title}</h1>
          </div>
        </header>
        <main className="max-w-xl mx-auto px-6 py-12 space-y-6">
          <h2 className="text-2xl font-light">{t.sector}</h2>
          <input type="text" value={data.sector} onChange={e => setData({ ...data, sector: e.target.value })} className="w-full p-4 border rounded" placeholder={t.sector} />
          <button onClick={() => setStep('buy-type')} className="w-full bg-red-600 text-white py-4 rounded hover:bg-red-700">{t.continue}</button>
        </main>
      </div>
    );
  }

  if (step === 'buy-type') {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-light">{t.title}</h1>
          </div>
        </header>
        <main className="max-w-xl mx-auto px-6 py-12 space-y-6">
          <h2 className="text-2xl font-light">{t.propertyType}</h2>
          <div className="grid gap-4">
            {[
              { key: 'Appartement', label: t.apartment, next: 'buy-details' },
              { key: 'Maison', label: t.house, next: 'buy-details' },
              { key: 'Immeuble', label: t.building, next: 'contact' },
              { key: 'Commerce', label: t.commercial, next: 'contact' },
              { key: 'Autre', label: t.other, next: 'contact' }
            ].map(p => (
              <button key={p.key} onClick={() => { setData({ ...data, type: p.key }); setStep(p.next); }} className="bg-white border-2 border-gray-200 p-6 rounded hover:border-red-600 text-left">
                {p.label}
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (step === 'buy-details') {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-light">{t.title}</h1>
          </div>
        </header>
        <main className="max-w-xl mx-auto px-6 py-12 space-y-6">
          <h2 className="text-2xl font-light">Détails</h2>
          <input type="text" value={data.budget} onChange={e => setData({ ...data, budget: e.target.value })} className="w-full p-4 border rounded" placeholder={t.budget} />
          <input type="number" value={data.rooms} onChange={e => setData({ ...data, rooms: e.target.value })} className="w-full p-4 border rounded" placeholder={t.rooms} />
          <input type="text" value={data.surface} onChange={e => setData({ ...data, surface: e.target.value })} className="w-full p-4 border rounded" placeholder={t.surface} />
          <button onClick={() => setStep('contact')} className="w-full bg-red-600 text-white py-4 rounded hover:bg-red-700">{t.continue}</button>
        </main>
      </div>
    );
  }

  if (step === 'sell-address') {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-light">{t.title}</h1>
          </div>
        </header>
        <main className="max-w-xl mx-auto px-6 py-12 space-y-6">
          <h2 className="text-2xl font-light">{t.address}</h2>
          <input type="text" value={data.address} onChange={e => setData({ ...data, address: e.target.value })} className="w-full p-4 border rounded" placeholder={t.address} />
          <button onClick={() => setStep('sell-type')} className="w-full bg-red-600 text-white py-4 rounded hover:bg-red-700">{t.continue}</button>
        </main>
      </div>
    );
  }

  if (step === 'sell-type') {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-light">{t.title}</h1>
          </div>
        </header>
        <main className="max-w-xl mx-auto px-6 py-12 space-y-6">
          <h2 className="text-2xl font-light">{t.propertyType}</h2>
          <div className="grid gap-4">
            {[
              { key: 'Appartement', label: t.apartment, next: 'sell-details' },
              { key: 'Maison', label: t.house, next: 'sell-details' },
              { key: 'Parking', label: t.parking, next: 'contact' },
              { key: 'Immeuble', label: t.building, next: 'contact' },
              { key: 'Commerce', label: t.commercial, next: 'contact' }
            ].map(p => (
              <button key={p.key} onClick={() => { setData({ ...data, type: p.key }); setStep(p.next); }} className="bg-white border-2 border-gray-200 p-6 rounded hover:border-red-600 text-left">
                {p.label}
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (step === 'sell-details') {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-light">{t.title}</h1>
          </div>
        </header>
        <main className="max-w-xl mx-auto px-6 py-12 space-y-6">
          <h2 className="text-2xl font-light">Caractéristiques</h2>
          <input type="number" value={data.rooms} onChange={e => setData({ ...data, rooms: e.target.value })} className="w-full p-4 border rounded" placeholder={t.rooms} />
          <input type="number" value={data.bedrooms} onChange={e => setData({ ...data, bedrooms: e.target.value })} className="w-full p-4 border rounded" placeholder={t.bedrooms} />
          <input type="number" value={data.floor} onChange={e => setData({ ...data, floor: e.target.value })} className="w-full p-4 border rounded" placeholder={t.floor} />
          <input type="number" value={data.totalFloors} onChange={e => setData({ ...data, totalFloors: e.target.value })} className="w-full p-4 border rounded" placeholder={t.totalFloors} />
          
          <div>
            <label className="block text-gray-700 mb-2">{t.hasBalcony}</label>
            <div className="flex gap-4">
              <button onClick={() => setData({ ...data, hasBalcony: 'Oui' })} className={`flex-1 p-4 border-2 rounded ${data.hasBalcony === 'Oui' ? 'border-red-600 bg-red-50' : 'border-gray-200'}`}>{t.yes}</button>
              <button onClick={() => setData({ ...data, hasBalcony: 'Non', balconySize: '' })} className={`flex-1 p-4 border-2 rounded ${data.hasBalcony === 'Non' ? 'border-red-600 bg-red-50' : 'border-gray-200'}`}>{t.no}</button>
            </div>
            {data.hasBalcony === 'Oui' && <input type="number" value={data.balconySize} onChange={e => setData({ ...data, balconySize: e.target.value })} className="w-full p-4 border rounded mt-4" placeholder={t.balconySize} />}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">{t.hasTerrace}</label>
            <div className="flex gap-4">
              <button onClick={() => setData({ ...data, hasTerrace: 'Oui' })} className={`flex-1 p-4 border-2 rounded ${data.hasTerrace === 'Oui' ? 'border-red-600 bg-red-50' : 'border-gray-200'}`}>{t.yes}</button>
              <button onClick={() => setData({ ...data, hasTerrace: 'Non', terraceSize: '' })} className={`flex-1 p-4 border-2 rounded ${data.hasTerrace === 'Non' ? 'border-red-600 bg-red-50' : 'border-gray-200'}`}>{t.no}</button>
            </div>
            {data.hasTerrace === 'Oui' && <input type="number" value={data.terraceSize} onChange={e => setData({ ...data, terraceSize: e.target.value })} className="w-full p-4 border rounded mt-4" placeholder={t.terraceSize} />}
          </div>
          
          <button onClick={() => setStep('contact')} className="w-full bg-red-600 text-white py-4 rounded hover:bg-red-700">{t.continue}</button>
        </main>
      </div>
    );
  }

  if (step === 'contact') {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-light">{t.title}</h1>
          </div>
        </header>
        <main className="max-w-xl mx-auto px-6 py-12 space-y-6">
          <h2 className="text-2xl font-light">{t.contactTitle}</h2>
          {error && <div className="bg-red-50 border border-red-300 rounded p-4 flex gap-3 text-red-700"><AlertCircle size={20} /><span>{error}</span></div>}
          <input type="text" value={data.firstName} onChange={e => setData({ ...data, firstName: e.target.value })} className="w-full p-4 border rounded" placeholder={t.firstName + ' *'} />
          <input type="text" value={data.lastName} onChange={e => setData({ ...data, lastName: e.target.value })} className="w-full p-4 border rounded" placeholder={t.lastName + ' *'} />
          <input type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} className="w-full p-4 border rounded" placeholder={t.email + ' *'} />
          <input type="tel" value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} className="w-full p-4 border rounded" placeholder={t.phone + ' *'} />
          <textarea value={data.comments} onChange={e => setData({ ...data, comments: e.target.value })} className="w-full p-4 border rounded h-32" placeholder={t.comments} />
          <button onClick={handleSubmit} disabled={loading} className="w-full bg-red-600 text-white py-4 rounded hover:bg-red-700 disabled:bg-gray-400 flex items-center justify-center gap-2">
            {loading ? <><Loader2 size={20} className="animate-spin" />{t.submitting}</> : t.submit}
          </button>
        </main>
      </div>
    );
  }

  if (step === 'thanks') {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-light">{t.title}</h1>
          </div>
        </header>
        <main className="max-w-2xl mx-auto px-6 py-12 text-center space-y-8">
          <div className="bg-red-50 border-2 border-red-600 rounded-lg p-8">
            <Check size={64} className="text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl font-light mb-4">{t.thanks}</h2>
            <p className="text-gray-700 text-lg">{t.thanksMsg}</p>
          </div>
          <div className="bg-white border rounded-lg p-8 text-left">
            <h3 className="text-xl font-light mb-4">{t.next}</h3>
            <ul className="space-y-3">
              <li className="flex gap-3"><Check size={20} className="text-red-600 mt-1 flex-shrink-0" /><span>{t.step1}</span></li>
              <li className="flex gap-3"><Check size={20} className="text-red-600 mt-1 flex-shrink-0" /><span>{t.step2}</span></li>
              <li className="flex gap-3"><Check size={20} className="text-red-600 mt-1 flex-shrink-0" /><span>{t.step3}</span></li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-600"><p>{t.rgpd}</p></div>
          <a href="https://www.engelvoelkers.com/fr" target="_blank" rel="noopener noreferrer" className="inline-block bg-red-600 text-white px-10 py-4 rounded hover:bg-red-700">{t.visit}</a>
        </main>
      </div>
    );
  }

  return null;
};

export default App;
