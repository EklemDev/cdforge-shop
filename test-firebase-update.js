const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDvJOmqd9mImo34d_uXOHRYpBdCBQmGJO8",
  authDomain: "codeforge-feb17.firebaseapp.com",
  databaseURL: "https://codeforge-feb17-default-rtdb.firebaseio.com",
  projectId: "codeforge-feb17",
  storageBucket: "codeforge-feb17.firebasestorage.app",
  messagingSenderId: "772503721079",
  appId: "1:772503721079:web:ee361d875b5d57b2dee272",
  measurementId: "G-GFEH1GMEXL"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testSiteConfigUpdate() {
  try {
    console.log('🧪 Testando atualização do SiteConfig...');
    
    // Testar atualização
    const testConfig = {
      discordLink: 'https://discord.gg/teste123',
      phone: '(11) 12345-6789',
      email: 'teste@codeforge.dev',
      instagram: '@teste_codeforge',
      whatsapp: 'https://wa.me/5511999999999',
      updatedAt: new Date()
    };
    
    const docRef = doc(db, 'siteConfig', 'main');
    await setDoc(docRef, testConfig, { merge: true });
    console.log('✅ Atualização realizada com sucesso');
    
    // Verificar se foi salvo
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('📄 Dados salvos:', docSnap.data());
    } else {
      console.log('❌ Documento não encontrado');
    }
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

testSiteConfigUpdate();
