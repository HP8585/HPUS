import axios from 'axios'

export const fetchAPI = ()=>{
    
const { startTimer, timeLeft, intervalId } = timeStatus()


    const isLoading = useState('loading', ()=> false);
    const shortendLink = ref(null)
    const apiKey = ref('dafa3f1cebcb75cb9b838c355fe782c623dca87c')

    const fetchData = async (url)=>{
        try{
            isLoading.value = true;
            
            const headers = {
                'Authorization':`Bearer ${apiKey.value}`,
                'Content-Type': 'application/json'
            }
        
            const data = {
                long_url: url
            }
          const response = await axios.post('https://api-ssl.bitly.com/v4/shorten', data, { headers })
          if(response?.data?.link){
          shortendLink.value = response?.data?.link
            isLoading.value = false;
            timeLeft.value = 120;
            if(intervalId.value){
                clearInterval(intervalId.value)
            }
            startTimer()
        }

        }catch (e){
            if(e?.response?.status === 429){
                apiKey.value = '51fff2d726b32bac903304468a03bfe7a0fc00b5'
                fetchData(url)
            }else if(e?.response?.status === 429 && apiKey.value === '51fff2d726b32bac903304468a03bfe7a0fc00b5'){
                apiKey.value = 'ace002ad97d845e9a93a8c2ce0a72f125c49af92'
                fetchData(url)
            }else if(e?.response?.status === 429 && apiKey.value === 'ace002ad97d845e9a93a8c2ce0a72f125c49af92'){
                apiKey.value = 'ccd0a871ea680debee8226faaaa8f4122fe09cdb'
                fetchData(url)
            }else if(e?.response?.status === 429 && apiKey.value === 'ccd0a871ea680debee8226faaaa8f4122fe09cdb'){
                apiKey.value = '1853eef317c3fbc27883d7db1096fee5a5ec220a'
                fetchData(url)
            }else{
                alert('Too many attempts! Try again Later.')
            }
        }
       
    }

    return{
        fetchData,
        isLoading,
        shortendLink
    }
}