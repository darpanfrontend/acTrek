"use client"
import React, { useState, useEffect } from 'react';
import ButtonComponent from 'app/components/ui/ButtonComponent';
import HeadingText from 'app/components/ui/HeadingText';
import { SuggestProps } from 'app/api_interfaces/ApiProps';

const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default function SuggestComponent({ url }: { url: string }) {
  console.log(url);
  const [formState, setFormState] = useState<SuggestProps>({
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState<Partial<SuggestProps>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError,setFormError]=useState('');

  useEffect(() => {
    setErrors({}); // Clear errors on form reset
    setSubmitSuccess(false); // Clear success flag on form reset
  }, [formState]); // Re-run on form state change

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  const handleValidation = () => {
    const newErrors = {} as Partial<SuggestProps>;

    if (!formState.name) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formState.email || !validateEmail(formState.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!handleValidation()) return; // Exit if validation fails

    setIsSubmitting(true);
    setErrors({}); // Clear errors on successful validation

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Set appropriate headers for JSON data
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmitSuccess(data.success); // Show success message
      } else {
        setFormError(response.statusText);
        console.error('Error:', response.statusText);
        // Handle API errors (e.g., display a generic error message)
      }
    } catch (error) {
        setFormError('Network error');
        console.log(error);
      // Handle network or other errors (e.g., display a generic error message)
    } finally {
      setIsSubmitting(false);
    }
  }

  const renderError = (field: keyof SuggestProps) => {
    return errors[field] && <span className="text-green-900">{errors[field]}</span>;
  };
  return (
      <>
      <section className="relative z-[2] bg-white bg-[url('/outlined/bg-web.svg')] bg-no-repeat bg-contain bg-bottom">
        <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-3xl sm:max-w-xl px-8 mx-auto">
          <div className='flex relative py-40 md:pb-60 lg:pb-80'>
            <div className='w-full lg:w-9/12 z-0 relative'>
              <HeadingText level={2} classList='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4'>Suggest Me A Trek</HeadingText>
              <h3 className='md:text-2xl mb-8'>Still confused on where to plan your next tek? Let us help you. Fill the form below and we will guide as where to visit.</h3>
              <form className={`${isSubmitting ? 'pointer-events-none' : ''} w-full lg:pr-24 pb-20`} onSubmit={(e) => handleSubmit(e)}>
                <div className='grid md:grid-cols-2 gap-8 mb-12'>
                    <div className='w-full'>
                        <input type='text' name="name" onChange={handleChange} className={`border-b-2 h-[60px] w-full block bg-transparent outline-none focus:border-green-900 transition-[border] duration-300 ease-in-out ${errors.name ? 'border-green-900' : 'border-gray-900'}`} placeholder='Enter your full name'/>
                        {renderError('name')}
                    </div>
                    <div className='w-full'>
                        <input type='text' name="email" onChange={handleChange} className={`border-b-2 h-[60px] w-full block bg-transparent outline-none focus:border-green-900 transition-[border] duration-300 ease-in-out ${errors.email ? 'border-green-900' : 'border-gray-900'}`} placeholder='Enter your email address' />
                        {renderError('email')}
                    </div>
                </div>
                {
                    submitSuccess &&
                    <div className='grid'>
                        <p className='text-green'>Your query has been sent. We will send you details of the package as soon as possible</p>
                    </div>
                }
                {
                    formError != '' &&
                    <div className='grid'>
                        <p className='text-orange-900'>{formError}</p>
                    </div>
                }
                <div className='grid lg:grid-cols-2 mt-8'>
                    <div>
                        <ButtonComponent className={`${isSubmitting ? 'pointer-events-none' : ''} w-auto`}>{
                            isSubmitting ? 
                            <>
                                Requesting 
                                <span className="relative inline-flex h-3 w-3 ml-2">
                                    <span className="animate-ping absolute inline-flex w-full h-full bg-gray-900 opacity-75"></span>
                                    <span className="relative inline-flex h-full w-full bg-gray-900"></span>
                                </span>
                            </> 
                            : 
                            <> 
                                Suggest Me A Trek
                            </>
                            }
                        </ButtonComponent>
                    </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      </>
  )
}