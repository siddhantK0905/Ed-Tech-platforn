import React, { useEffect, useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link , matchPath} from 'react-router-dom'
import { BsChevronDown } from "react-icons/bs"
import{NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import {IoIosArrowDropdownCircle} from "react-icons/io"


const Navbar = () => {

    const location = useLocation();

    const {user} = useSelector( (state) => state.profile)
    const {token} = useSelector( (state) => state.auth)
    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    const [categoryLink, setCategoryLink] = useState([]);



    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname);
    }

    let response=[];

    useEffect(() => {
        ;(async () => {
          setLoading(true)
          try {
            const res = await apiConnector("GET", categories.CATEGORIES_API)
             response = res.data.allData;
            console.log("Result",response);
            console.log("Length ", response.length);
            setSubLinks(response)
            console.log("Sublinks value is", subLinks)
          } catch (error) {
            console.log("Could not fetch Categories.", error )
          }
          setLoading(false)
        })()
      }, [])



  return (
    <div className='flex border-b-[1px] border-richblack-700 h-14 items-center'>

        <div className='flex flex-row w-11/12 mx-auto items-center justify-between max-w-maxContent'>
            {/* logo */}
            <Link to="/">
                <img
                    src={logo}
                    height={42}
                    width={160}
                />
            </Link>

            {/* Dashboard */}
            <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

            
            {/* Login signUp Dashboard */}
            <div className='flex gap-x-4 items-center'>
                {
                    user && user.accountType==="Instructor" && (
                        <Link to="/dashboard/cart">

                        </Link>
                    )
                }

                     {/* User not Logged in */}
                {
                    token === null && (
                        <Link to="/login">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                Log in
                            </button>
                        </Link>

                    )
                }

                {
                   token === null && (
                    <Link to="/signup" >
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            sign Up
                        </button>
                    </Link>
                   )   
                }

                {
                    token !== null && <ProfileDropDown/>
                }
            </div>

        </div>

    </div>
  )
}

export default Navbar