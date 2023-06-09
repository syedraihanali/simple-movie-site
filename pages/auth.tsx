import axios from 'axios';
import { useCallback, useState } from "react";
import Input from "@/components/input"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Auth = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant == 'login' ? 'register' : 'login');
    }, []);
    const login = useCallback(async() => {
        try {
            await signIn('credentials', {
                email,
                password,
                callbackUrl: '/profiles'
            });

        } catch(error){
            console.log(error);
        }

    }, [email, password, ]);
    const register = useCallback(async ()=>{
        try{
            await axios.post('/api/register', {
                email,
                name,
                password,
            });
            login();

        } catch(error){
            console.log(error);
        }

    }, [email, name, password, login]);

    return(
        <div className="relative h-full w-full bg-[url('/images/back.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="./images/logo (2).png" alt="logo" className="h-12"/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-6 py-12 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant == 'login' ? 'Sign in' : 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant == 'register' && (
                                <Input label="Username"
                                onChange={(ev: any) => setName (ev.target.value) }
                                id="name"
                                value={name}/>
                            )}
                            
                            <Input label="Email = demo@mail.com"
                            onChange={(ev: any) => setEmail (ev.target.value) }
                            id="email"
                            type="email"
                            value={email}/>
                            <Input label="Password = demo"
                            onChange={(ev: any) => setPassword (ev.target.value) }
                            id="Password"
                            type="Password"
                            value={password}/>
                        </div>
                        <button onClick={variant == 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {variant == 'login' ? 'Log in' : 'Sign up'}
                        </button>
                        <div className="flex flex-row item center gap-4 mt-8 justify-center">
                            <div onClick={() => signIn( 'google', { callbackUrl: '/profiles' })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition">
                                <FcGoogle size={30}/>

                            </div>
                            <div onClick={() => signIn( 'github', { callbackUrl: '/profiles' })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-70 transition">
                                <FaGithub size={30}/>

                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {variant == 'login' ? 'First time here?' : 'Already have an account?'}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:unerline cursor-pointer">
                                {variant == 'login' ? 'Create an account' : 'Log in'}
                            </span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Auth;