import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Container = () => {

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const ref = useRef()
    const passwordref = useRef()
    const [editingId, setEditingId] = useState(null)

    const getPasswords = async () => {
        const req = await fetch("http://localhost:3000/")
        const passwords = await req.json()
        setPasswordArray(passwords);
        console.log(passwords);
    }

    useEffect(() => {
        getPasswords();
    }, [])


    const handlerEye = () => {
        if (ref.current.src.includes("/icons/eye.png")) {
            passwordref.current.type = "text"
            ref.current.src = "/icons/hidden.png"
        }
        else {
            passwordref.current.type = "password"
            ref.current.src = "/icons/eye.png"
        }
    }

    const handleForm = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            savePasswords();
        }
      };

    const savePasswords = async (e) => {
        if (form.site.length && form.username.length > 2 && form.password.length > 6) {
            const newPassword = { ...form, id: uuidv4() };
            setform({ ...form })
            setPasswordArray([...passwordArray, newPassword])
            console.log(passwordArray);
            // localStorage.setItem("passwords", JSON.stringify(newPasswords))
            const req = await fetch("http://localhost:3000/", {
                method: "POST", headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify(newPassword)
            })
            setform({ site: "", username: "", password: "" })
            toast.success("✅ Password saved!", {
                theme: "dark"
            })
        } else {
            toast.error("❌ Enter information properly", {
                theme: "dark"
            })
        }
    }

    const editPass = (id) => {
        console.log(id);
        let toEdit = passwordArray.find(item => item.id === id)
        setform({ ...form, site: toEdit.site, username: toEdit.username, password: toEdit.password })
        setEditingId(toEdit.id)
        console.log(editingId);
    }

    const updatePassword = async () => {
        console.log(form);

        if (form.site && form.username.length > 2 && form.password.length > 6) {
            let updatedPassword = { ...form, id: editingId };
            let updatedArr = passwordArray.map(item => {
                return item.id === editingId ? updatedPassword : item
            })
            setPasswordArray(updatedArr);
            // localStorage.setItem("passwords", JSON.stringify(updatedArr))
            const req = await fetch("http://localhost:3000/", {
                method: "POST", headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify(updatedArr)
            })
            setform({ site: "", username: "", password: "" })
            setEditingId(null)
            toast.success("✅ Password updated!", {
                theme: "dark"
            });
        } else {
            toast.error("❌ Please enter valid details", {
                theme: "dark"
            });
        }
    }

    const deletePass = async (e, id) => {
        console.log("id : "+id);
        e.preventDefault()
        // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        await fetch("http://localhost:3000/", {
            method: "DELETE", headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({id})
        })
        setPasswordArray(passwordArray.filter(item => item.id !== id))
        toast.success("🗑️ Password deleted!", {
            theme: "dark"
        })
    }


    const copytext = (text) => {
        toast('copied to clipboard', {
            theme: "dark"
        });
        navigator.clipboard.writeText(text);
    }

    return (
        <div className='h-[80vh] overflow-auto'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='flex flex-col gap-4 justify-center items-center mt-2'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='font-bold text-[32px]'>
                        &lt;<span>pass</span><span className='text-purple-700 text-[36px]'>Op</span>/&gt;
                    </div>
                    <div className='font-bold'>Manage Your Own Passwords</div>
                </div>

                <div className='w-[80%]'>
                    <input type="text" placeholder='enter website url' name='site' onKeyDown={handleKeyDown} onChange={handleForm} className='border border-purple-400 px-4 py-1 rounded-full w-full text-[14px]' value={form.site} />
                </div>

                <div className='w-[80%] flex flex-col justify-around items-center lg:flex-row lg:justify-between lg:items-center'>
                    <input type="text" placeholder='enter username' name='username' onKeyDown={handleKeyDown} onChange={handleForm} className='border border-purple-400 px-4 py-1 rounded-full w-full mb-4 lg:mb-0 lg:w-[70%] text-[14px]' value={form.username} />
                    <div className='relative w-full lg:w-[28%]'>
                        <input ref={passwordref} type="password" placeholder='enter password' name='password'  onKeyDown={handleKeyDown}  onChange={handleForm} className='border border-purple-400 px-4 py-1 rounded-full w-[100%] text-[14px]' value={form.password} />
                        <img src="/icons/eye.png" className='w-4 h-4 absolute right-3 top-2 hover:cursor-pointer' alt="" srcSet="" ref={ref} onClick={handlerEye} />
                    </div>
                </div>
                {editingId ? (
                    <button className='flex items-center gap-2 border border-purple-400 px-4 py-1 rounded-full justify-center hover:cursor-pointer bg-purple-500 hover:bg-purple-600 text-white transition-all duration-300 ease-in-out' onClick={updatePassword}>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        <div className='font-bold'>Update Password</div>
                    </button>) : (
                    <button className='flex items-center gap-2 border border-purple-400 px-4 py-1 rounded-full justify-center hover:cursor-pointer bg-purple-500 hover:bg-purple-600 text-white transition-all duration-300 ease-in-out' onClick={savePasswords}>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            style={{ width: "20px", height: "20px" }}>
                        </lord-icon>
                        <div className='font-semibold text-[15px]'>Save Passwords</div>
                    </button>)}

                {editingId ? (<div className='font-bold text-2xl w-[80%]'>Update Password</div>) : (<div className='font-bold text-2xl w-[80%]'>Passwords</div>)}
                {passwordArray.length === 0 && <div className='w-[80%]'>No Passwords To Show</div>}
                {passwordArray.length !== 0 && (
                    <div className='overflow-x-auto overflow-y-auto w-[90%] h-[60%] flex justify-center items-center'>
                        <table className='table-auto w-full lg:w-[90%] border border-purple-400 rounded-lg overflow-hidden my-4'>
                            <thead className='bg-purple-500'>
                                <tr className='flex justify-center py-2 px-2 font-[100]'>
                                    <th className='w-[37%] lg:w-[40%] text-left font-[600] text-white text-[16px] flex justify-center items-center'>Site</th>
                                    <th className='w-[23%] lg:w-[20%] text-left font-[600] text-white text-[16px] flex justify-center items-center'>Username</th>
                                    <th className='w-[24%] lg:w-[20%] text-left font-[600] text-white text-[16px] flex justify-center items-center'>Password</th>
                                    <th className='w-[16%] lg:w-[20%] text-left font-[600] text-white text-[16px] flex justify-center items-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordArray.map((item, index) => (
                                    <tr key={index} className='flex justify-around bg-purple-100 '>
                                        <td className='w-[37%] lg:w-[40%] text-[13px] flex justify-around items-center border border-purple-500 p-2 break-all whitespace-normal'>
                                            <a className='w-3/4' href={item.site}>{item.site}</a>
                                            <button className='w-1/4 hover:cursor-pointer pt-1' onClick={() => copytext(item.site)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ width: "17px", height: "20px" }}>
                                                </lord-icon>
                                            </button>
                                        </td>
                                        <td className='w-[23%] lg:w-[20%] text-[13px] flex justify-around items-center border border-purple-500 p-2 break-all whitespace-normal '>
                                            <span className='w-3/4'> {item.username}</span>
                                            <button className='w-1/4 hover:cursor-pointer pt-1' onClick={() => copytext(item.username)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ width: "17px", height: "20px" }}>
                                                </lord-icon>
                                            </button>
                                        </td>
                                        <td className='w-[24%] lg:w-[20%] text-[13px] flex justify-around items-center border border-purple-500 p-2 break-all whitespace-normal'>
                                            <span className='w-3/4'> {"*".repeat(item.password.length)}</span>
                                            <button className='w-1/4 hover:cursor-pointer pt-1' onClick={() => copytext(item.password)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ width: "17px", height: "20px" }}>
                                                </lord-icon>
                                            </button>
                                        </td>
                                        <td className='w-[16%] lg:w-[20%] text-[13px] flex justify-center items-center border border-purple-500 p-2 break-all whitespace-normal'>
                                            <button className='hover:cursor-pointer px-1' onClick={() => editPass(item.id)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ width: "17px", height: "20px" }}>
                                                </lord-icon>
                                            </button>
                                            <button className='hover:cursor-pointer px-1' onClick={(e) => deletePass(e, item.id)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ width: "17px", height: "20px" }}>
                                                </lord-icon>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Container
