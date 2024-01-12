import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from "./SidebarLink"
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../services/operations/authAPI'
import {VscSignOut} from "react-icons/vsc" 
import ConformationModal from "../Dashboard/ConformationModal"

const Sidebar = () => {

    const {loading:authLoading} = useSelector( (state) => state.auth)
    const {user, loading:profileLoading} = useSelector( (state) => state.profile)
    const [conformationModal, setConformationModal] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(authLoading|| profileLoading){
        return (
            <div>
                loading....
            </div>
        )
    }

  return (
    <div> 
        <div className='flex min-w-[220px] flex-col border-r-[1px] border-r-richblack-700
        h-full bg-richblack-800 py-10'>

            <div className='flex flex-col'>
                {
                    sidebarLinks.map ( (link) => {
                       <h1 className=' text-lg text-white'>In Sidebar {link.type}</h1>
                        if(link.type && user?.accountType !== link.type) return null;
                        return(
                            <SidebarLink
                                key={link.id} link={link} iconName={link.icon}
                            />
                        )
                    })
                }

            </div>

            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700'>
            </div>

            <div className='flex flex-col'>
                <SidebarLink
                    link = {{path:"dashboard/settings" , name:"Settings"}}
                    iconName="VscSettingsGear"
                />

                <button
                    onClick={() => setConformationModal ( {
                        text1 : "Are you sure ?",
                        text2 :"You will be logged out from your account",
                        btn1Text: "Logged Out",
                        btn2Text: "Cancel",
                        btn1Handler : () => dispatch(logout(navigate)),
                        btn2Handler : () => setConformationModal(null),
                    })}
                    className='text-sm font-medium text-richblack-300'
                >

                    <div className='flex items-center gap-x-2 text-white pl-8'>
                        <VscSignOut className="text-lg"/>
                        <span>Logout</span>
                    </div>

                </button>

            </div>

        </div>
        
            {conformationModal && <ConformationModal modalData={conformationModal}/>}

        
    </div>
  )
}

export default Sidebar