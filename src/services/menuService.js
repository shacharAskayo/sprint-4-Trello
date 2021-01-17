import axios from 'axios'
export const menuService={
    getNetworkBooks
}
function getNetworkBooks(query) {
    const url =`https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg`;
return axios.get(url)
.then(res=>res.data)
}