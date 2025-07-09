const { googleapi } = require('googleapi');

const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/admin.directory.group.member'],
    keyFile: 'chave-de-servico.json'
});
  
async function addToGoogleGroup(email) {
const authClient = await auth.getClient();
const service = google.admin({ version: 'directory_v1', auth: authClient });

try {
    await service.members.insert({
        groupKey: 'seu-grupo@seudominio.com',
        requestBody: {
            email,
            role: 'MEMBER'
        }
    });
    
    console.log(`${email} adicionado ao grupo!`);
} catch (err) {
    if (err.code === 409) {
    console.log(`${email} já está no grupo.`);
    } else {
    console.error('Erro ao adicionar ao grupo:', err.message);
    }
}
}
  
module.exports = { addToGoogleGroup };