import React, {useState,useEffect} from 'react'
import './MainPart.css'
import ChatBot from "/src/components/ChatBot/ChatBot"
import {auth,db} from '../../../firebase'
import { collection, addDoc } from "firebase/firestore"; 
import { useSpeechSynthesis } from "react-speech-kit";
import Popup from '../../../components/popupchatbot/Popup';
import {TbMessageChatbot} from 'react-icons/tb'
const EggMainPart = () => {
  const [imageUpload, setImageUpload] = useState(null)
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
    
    setPredictedDisease("Founded")
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
         <h1 className='lg:text-2xl text-1xl mb-10  font-bold'>Upload image to detect egg quality</h1>
         <form className='flex flex-col items-center justify center' onSubmit={handlPrediction}>
          <div className='lg:text-xl text-1xl flex justify-center items-center   md:w-[500px] md:h-[300px] border-solid border-2 rounded-[15px]'>
           {form.photo ? <img src={form.photo} alt="uploaded" className=' w-[400px] h-[199px]  md:w-[500px] md:h-[299px]  border-2 lg:w-[500px] lg:h-[300px] border-solid border-4 rounded:-[5px] md:rounded-[15px]'/> : <h1 className=' font-bold'>No Image Uploaded</h1>}
          </div>
          <div className='flex'>
                <label htmlFor="photo" className="cursor-pointer">
                    <div className='mt-3 text-white bg-[#6469ff] hover:text-[#6469ff] hover:bg-blue-200 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>Upload</div>
                    <input type="file" accept="image/*" capture='environment' name="photo" id="photo" className="sr-only" onChange={handleUpload} />
                </label>
                <button className='m-3 text-white bg-[#6469ff] hover:text-[#6469ff] hover:bg-blue-200 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'  type='submit'>Predict</button>
            </div>
            </form>
           <h1 className='lg:text-2xl text-1xl font-bold  m-5'>{predictedDisease}</h1>
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

export default EggMainPart
