import React, { useEffect, useState } from 'react'
import "./Main.css"
import List from '../List/List'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
    const getLocalItem = ()=>{
        let listData = localStorage.getItem("items")
        if (listData) {
           return JSON.parse(localStorage.getItem("items"))
        }
        else{
          return  []
        }
    }
    const [inputValue, setInputValue] = useState("")
    const [allData, setAllData] = useState(getLocalItem())
    const [toggleEdit, setToggleEdit] = useState(true)
    const [isEditItem, setIsEditItem] = useState(null)
    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    useEffect(() => {
      localStorage.setItem("items", JSON.stringify(allData))
    
    }, [allData])
    
    
const handleAddItem =()=>{
    if (inputValue ==="") {
        toast.error('Write Something To Add', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
    else if(inputValue && !toggleEdit){
       setAllData(
        allData.map((elem)=>{
            if (elem.id === isEditItem) {
                return{...elem, item:inputValue}
            }
            return elem;
        })
        )
        toast.success('Edited Successfully', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        setToggleEdit(true)
        setInputValue("")
    }
    else{
        setAllData([...allData, inputValue])
        const dataWithId = {
            id: new Date().getTime().toString(), item: inputValue
        } 
        toast.success('Item Added Successfully', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        setAllData([...allData, dataWithId])
        setInputValue('')
        console.log(allData)

    }
}

    return (
        <div className='main'>
            <div className="input">

                <input type="text" onChange={handleChange} value={inputValue} placeholder='Write Your task' />
             {
                 toggleEdit ?  <button onClick={handleAddItem} className='add' >➕</button>
              :   <button onClick={handleAddItem} className='add' >🔏</button>
                 
            } 
            </div>

            <List allData={allData} setAllData={setAllData}  setInputValue={setInputValue}  setToggleEdit={setToggleEdit} setIsEditItem={setIsEditItem}/>
            <ToastContainer/>
        </div>
    )
}

export default Main
