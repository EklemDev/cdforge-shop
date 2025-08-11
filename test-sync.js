const { initializeApp } = require('firebase/app');
const { getFirestore, doc, onSnapshot, setDoc } = require('firebase/firestore');

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

async function testRealTimeSync() {
  try {
    console.log('🧪 Testando sincronização em tempo real...');
    
    // Configurar listener em tempo real
    const docRef = doc(db, 'siteConfig', 'main');
    
    const unsubscribe = onSnapshot(docRef, (doc) => {
      console.log('📡 Listener disparado!');
      if (doc.exists()) {
        const data = doc.data();
        console.log('📄 Dados atuais:', {
          phone: data.phone,
          whatsapp: data.whatsapp,
          discordLink: data.discordLink,
          email: data.email,
          instagram: data.instagram
        });
      } else {
        console.log('❌ Documento não existe');
      }
    }, (error) => {
      console.error('❌ Erro no listener:', error);
    });

    // Aguardar um pouco para o listener ser configurado
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Fazer uma atualização
    console.log('🔄 Fazendo atualização...');
    await setDoc(docRef, {
      phone: '(11) 98765-4321',
      whatsapp: 'https://wa.me/5511987654321',
      discordLink: 'https://discord.gg/teste456',
      email: 'teste@codeforge.dev',
      instagram: '@teste_codeforge',
      updatedAt: new Date()
    }, { merge: true });
    
    console.log('✅ Atualização enviada');
    
    // Aguardar para ver se o listener é disparado
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Fazer outra atualização
    console.log('🔄 Fazendo segunda atualização...');
    await setDoc(docRef, {
      phone: '(11) 11111-1111',
      whatsapp: 'https://wa.me/5511111111111',
      discordLink: 'https://discord.gg/teste789',
      email: 'teste2@codeforge.dev',
      instagram: '@teste2_codeforge',
      updatedAt: new Date()
    }, { merge: true });
    
    console.log('✅ Segunda atualização enviada');
    
    // Aguardar mais um pouco
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Limpar listener
    unsubscribe();
    console.log('👋 Listener removido');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

testRealTimeSync();
