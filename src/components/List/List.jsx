import React from 'react'
import "./List.css"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const List = ({allData,setAllData, setInputValue, setToggleEdit, setIsEditItem}) => {
  

   

    const handleEdit = (id)=>{
        const editData = allData.find((elem)=>{
            return id === elem.id
        })
        setInputValue(editData.item)
        console.log(editData)
        setToggleEdit(false)
        setIsEditItem(id)
    }
    
    const handleDelete =(idx)=>{
        const updatedData = allData.filter((elem)=>{
                return idx !== elem.id       
             })
             setAllData(updatedData)
             
             toast.success('Deleted Successfully', {
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

    return (

       
        <div className='list'>
 <h2>Your List Items</h2>
 <h3>{allData.length} - Items In Your list</h3>
<div className="wrap">
            {
                allData.map((elem)=>{
                    return    <div key={elem.id} className="items">
                    <div className="item">
                        {elem.item}
                    </div>
                    <div className="buttons">
                        <div  onClick={()=>handleEdit(elem.id)}>🖋️</div>
                        <div onClick={()=>handleDelete(elem.id)}>🚮</div>
                    </div>
                </div> 
                })
            }
       <ToastContainer />
       </div>     
       </div>
    )
}

export default List
