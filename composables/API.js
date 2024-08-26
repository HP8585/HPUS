import axios from 'axios'
import * as yup from 'yup';
import * as pkg from 'vue-toastification'


export const fetchAPI = ()=>{

const { useToast } = pkg;
const toast = useToast();

function triggerErrToast(msg){
  toast.error(msg, {
       position: "top-right",
       timeout: 5000,
       closeOnClick: true,
       pauseOnFocusLoss: true,
       pauseOnHover: true,
       draggable: true,
       draggablePercent: 0.6,
       showCloseButtonOnHover: true,
       hideProgressBar: false,
       closeButton: "button",
       rtl: false
})
}

const { startTimer, timeLeft, intervalId } = timeStatus()
const schema = yup.object().shape({
    url: yup.string().url().required("URL is required"),
    slug: yup.string().min(4, "Slug must be at least 4 characters").max(8, "Slug must be at most 8 characters")
    .nullable().optional().matches(/^\S*$/, "Slug cannot contain spaces")
});

    const isLoading = useState('loading', ()=> false);
    const shortendLink = useState('shortendLink', ()=> null)

    const url = useState('url', ()=> null)
    const slug = useState('slug', ()=> null)

    const fetchData = async ()=>{
        try{
            isLoading.value = true;
            
            const body = ref({
                url: url.value,
                slug: slug.value
            })
            if(body.value.slug == null || body.value.slug === '' || body.value.slug == ' '){
                delete body.value.slug
            }
        await schema.validate(body.value);
          const response = await axios.post('https://hp-us.vercel.app/url', body.value)
          console.log(response.data);
          
          if(response?.data?.new_url){
          shortendLink.value = response?.data?.new_url;
            timeLeft.value = 120;
            if(intervalId.value){
                clearInterval(intervalId.value)
            }
            startTimer()
        }

        }catch (e){
            // Check if the error is a Yup validation error
            if (e.name === 'ValidationError') {
                e.errors.forEach(error => {
                    triggerErrToast(error)
                });
            } else {
                console.error(e); // Log unexpected errors
                triggerErrToast(e.response.data.message)
            }
            
        }finally{
            isLoading.value = false;
        }
       
    }

    return{
        fetchData,
        isLoading,
        shortendLink,
        slug,
        url
    }
}