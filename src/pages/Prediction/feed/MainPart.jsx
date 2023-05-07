import React, {useState,useEffect} from 'react'
import './MainPart.css'
import ChatBot from "/src/components/ChatBot/ChatBot"
import {auth,db} from '../../../firebase'
import { collection, addDoc } from "firebase/firestore"; 
import { useSpeechSynthesis } from "react-speech-kit";
import { crop_model_predict } from '../../../data_portal';
import { Chart } from "react-google-charts";
import Popup from '../../../components/popupchatbot/Popup';
import {TbMessageChatbot} from 'react-icons/tb'
export const data = [
  ["Task", "Hours per Day"],
  ["Work", 1],
  ["Eat", 2],
  ["Commute", 2]
];
export const options = {
  title: "Nutrient",
};
const FeedMainPart = () => {
  const [imageUpload, setImageUpload] = useState(null)
  const [base64, setBase64] = useState(null)
  const [form,setForm]=useState({
      name:'',
      prompt:'',
      photo:'',
  })
  const [predictedDisease,setPredictedDisease]=useState("No Species Detected")
  const [buttonPopup, setButtonPopup] = useState(false)
  

 
    //speech
    const { speak } = useSpeechSynthesis();
    const convert = () => {
      speak({ text: predictedDisease });
    };
  
    const view=()=>{
      setButtonPopup(true);
    }
    
    useEffect(() => {
      convert()
    }, [predictedDisease])

  console.log(imageUpload)
  const handleUpload = (e) => {
    const file=e.target.files[0]
    setImageUpload(file);

    if(file && file.type.substr(0,5)==='image'){
        const reader=new FileReader()
        reader.onloadend=()=>{
            setForm({...form,photo:reader.result})
        }
        reader.readAsDataURL(file)
    }
    else{
        alert('Please upload animage')
    }
    }
   
    const handleChange=(e)=>{
      setForm({...form,[e.target.name]:e.target.value})
  }

  //Most Important Function
  const user=auth.currentUser
  const addDisease = async(e) => {
    try{
      const userdata= await addDoc(collection(db, "eggquality"), {
        name:predictedDisease,
        time:new Date().toLocaleString(),
        user:user.uid
       });
    }catch{
      ((error) => {
        alert(error.message)
    })
  }}
  const handlPrediction= async(e)=>{
    e.preventDefault()
    const response = await crop_model_predict()
    console.log(100)
    console.log(response.crop)
    setPredictedDisease(response.crop)
     try {
       addDisease()
     } catch (error) {
        console.log(error)
     }
    
  }
  
  return (
    <>
      {/* <NavBar /> */}
      <div className='main flex lg:flex-row flex-col    justify-between mt-10 lg:mt-5'>
        <div className="model flex flex-col  justify-center items-center  lg:w-[950px]  lg:h-[600px] border-solid border-[2px] lg:m-3 m-5 ">
          <h1 className='lg:text-2xl text-1xl mb-10  font-bold'>Demo chart</h1>
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
          />
        </div>
       <div className=' flex lg:hidden justify-end mr-10 text-2xl' >
         <button onClick={view} className='flex'>
          <TbMessageChatbot/> <h1 className='text-sm'>HelperBot</h1>
          </button> 
       </div>


       {/*Pop */}
       <Popup trigger={buttonPopup} setTrigger={setButtonPopup} >
       <div className="flex flex-col  justify-center  items-center">
       <h1 className='text-xl font-bold text-gray-700 flex justify-center'>Helper Bot</h1>

        <div className='w-[350px] h-[400px] flex justify-center items-center '>
          <ChatBot/>
        </div>
       </div>
</Popup>
    </div>
    </>
  )
}

export default FeedMainPart
