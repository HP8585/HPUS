export const timeStatus = ()=>{

    const intervalId = useState('intervalId', ()=> null)
    const timeLeft = useState('timeLeft', ()=> 0)
    const formattedTimer = ref(null)

    const startTimer = ()=>{
        intervalId.value = setInterval(()=>{
            if(timeLeft.value > 0){
                timeLeft.value--;
                const minutes = Math.floor(timeLeft.value / 60)
                const seconds = timeLeft.value % 60;
                formattedTimer.value = `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`
                localStorage.setItem('timeLeft', JSON.stringify({ timeLeft: timeLeft.value, formattedTimer: formattedTimer.value }))
            }else{
                clearInterval(intervalId.value)
                localStorage.removeItem('timeLeft')
            }
        }, 1000)
    }


    return{
        startTimer,
        intervalId,
        formattedTimer,
        timeLeft
    }
}