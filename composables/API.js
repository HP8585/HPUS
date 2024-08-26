import axios from 'axios'
import * as yup from 'yup';



export const fetchAPI = ()=>{
    
const { startTimer, timeLeft, intervalId } = timeStatus()
const schema = yup.object().shape({
    url: yup.string().url().required("URL is required"),
    slug: yup.string().min(4, "Slug must be at least 4 characters").max(8, "Slug must be at most 8 characters")
    .nullable().optional()
});

    const isLoading = useState('loading', ()=> false);
    const shortendLink = useState('shortendLink', ()=> null)

    const url = useState('url', ()=> null)
    const slug = useState('slug', ()=> null)

    const fetchData = async ()=>{
        try{
            isLoading.value = true;
            
        await schema.validate({
            url: url.value,
             slug: slug.value
        });
          const response = await axios.post('https://hp-us.vercel.app/url', {
            url: url.value,
            slug: slug.value
          })
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
                    alert(error); // Call your alarm function here with the error reason
                });
            } else {
                console.error(e); // Log unexpected errors
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