import React, { useState, useRef, useEffect } from 'react';
import './style.css'
import { AiOutlineInstagram, AiOutlineWhatsApp, AiOutlineFacebook, AiOutlineClose, AiOutlineDownCircle } from 'react-icons/ai';
import { ImLocation } from 'react-icons/im';
import { PiPaperPlaneTiltLight, PiMaskHappyThin } from 'react-icons/pi';
import { IoCallOutline } from 'react-icons/io5';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { IoColorPalette } from "react-icons/io5";
import { BsSunrise, BsSun, BsSunset, BsChevronBarExpand } from 'react-icons/bs';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { TiTick } from 'react-icons/ti'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import image1 from './Resources/proffessionals/proff2-1.jpg';
import image2 from './Resources/proffessionals/proff2-2.jpg';
import image3 from './Resources/proffessionals/proff2-3.jpg';
import image4 from './Resources/proffessionals/proff2-4.jpg';
import image5 from './Resources/proffessionals/proff2-5.jpg';
import gallery1 from './Resources/gallery/gallery-1.jpg';
import gallerymobile from './Resources/gallery/gallery-1-mobile.jpg'
import gallery2 from './Resources/gallery/gallery-2.jpg';
import gallery3 from './Resources/gallery/gallery-3.jpg';
import gallery4 from './Resources/gallery/gallery-4.jpg';
import gallery5 from './Resources/gallery/gallery-5.jpg';
import gallery6 from './Resources/gallery/gallery-6.jpg';
import gallery7 from './Resources/gallery/gallery-7.jpg';
import gallery8 from './Resources/gallery/gallery-8.jpg';
import gallery9 from './Resources/gallery/gallery-9.jpg';
import gallery10 from './Resources/gallery/gallery-10.jpg';
import axios from 'axios';
import CustomCarousel from './content7'
import { GiHairStrands, GiCharcuterie } from "react-icons/gi";
import ProfessionalCarousel from './content4';
import Swal from 'sweetalert2';



const HomePage = () => {



    //Requests

    const [response, setResponse] = useState('');
    const [token, setToken] = useState(null);
    const [tokenKey, setTokenKey] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [isUser, setIsUser] = useState(false);
    const [OTP, SetOpt] = useState('');

    const postData = {
        phone: phoneNumber,
    };

    let verifyData = {
        phone: '',
        otp: '',
    };

    const handleOtpRequest = () => {
        axios.post('https://thorfinn.pythonanywhere.com/auth/generate/', postData)
            .then((response) => {
                setResponse(response.data);

                // After getting the OTP, make another request to verify and obtain the token
                verifyData = {
                    phone: postData.phone,
                    otp: String(response.data.generated_otp),
                };

                alert(response.data.generated_otp);

            })
            .catch((error) => {
                console.error('POST request error:', error);
            });
    };

    const handleVerifyRequest = () => {

        axios.post('https://thorfinn.pythonanywhere.com/auth/verify/', verifyData)
            .then((response) => {
                // Assuming the token is in response.data.token, you can set it in state or use it as needed.
                if (response.data.token != null) {
                    setToken(true);
                    setTokenKey(response.data.token);
                    console.log("just set the token to true ");
                    setCookie('token', response.data.token, 1);

                }

                console.log("the token is " + response.data.token);


            })
            .catch((error) => {
                setToken(false);
                console.log("just set the token to false");
                console.error('Verify request error:', error);
            });
    }

    // Function to set the cookie with token
    const setCookie = (cname, cvalue, exdays) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };

    // Function to get the cookie value by name
    const getCookie = (cname) => {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

    // Function to delete the cookie by name
    const deleteCookie = (cname) => {
        document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    // Handle logout: Delete token cookie and update state
    const handleLogout = () => {
        deleteCookie('token');
        setToken(null);
    };

    // Check if the token exists in cookies to determine user login status
    const checkUserLoginStatus = () => {
        const tokenFromCookie = getCookie('token');
        if (tokenFromCookie) {
            setToken(tokenFromCookie);
            setIsUser(true);
        }
    };

    //keep checking if user is present or not
    useEffect(() => {
        checkUserLoginStatus();
    }, []);


    //Login 

    useEffect(() => {
        if (token === true) {
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'Welcome back!',
            });
            setIsUser(true);

            const parentDiv = document.getElementById('parent-div');
            const loginContainer = parentDiv.querySelector('.login-container');
            if (loginContainer) {
                parentDiv.removeChild(loginContainer);
                handleMinimizeOrder();
            }
        } else if (token === false) {
            alert("Failed to login...");
        }
    }, [token]);

    const handleLoginClick = () => {
        const parentDiv = document.getElementById('parent-div');

        // Create the container div
        const loginContainer = document.createElement('div');
        loginContainer.classList.add('login-container');

        // Create the closeContainer button
        // Create close button 
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Back';
        closeButton.classList.add('close-button');
        loginContainer.appendChild(closeButton);



        // Add click event to close button
        closeButton.addEventListener('click', () => {
            parentDiv.removeChild(loginContainer);
        });

        // Create the input field for mobile number
        const mobileInput = document.createElement('input');
        mobileInput.type = 'tel';
        mobileInput.placeholder = 'Enter Mobile Number';
        mobileInput.classList.add('login-input');

        //Create the input field for OTP
        const otpInput = document.createElement('input');
        otpInput.type = 'number';
        otpInput.placeholder = "Enter OTP...";
        otpInput.classList.add('login-input');

        // Create the "Send OTP" button
        const sendOTPButton = document.createElement('button');
        sendOTPButton.textContent = 'Send OTP';
        sendOTPButton.classList.add('send-otp-button');

        //Create the "Verify OTP" button
        const verifyOTPButton = document.createElement('button');
        verifyOTPButton.textContent = "Enter OTP...";
        verifyOTPButton.classList.add('send-otp-button');

        //Create the "Change Number" button
        const changeNumberButton = document.createElement('button');
        changeNumberButton.textContent = "Change Number";
        changeNumberButton.classList.add('send-otp-button');
        changeNumberButton.classList.add('change-number');

        // Append elements to the container
        loginContainer.appendChild(mobileInput);
        loginContainer.appendChild(sendOTPButton);
        parentDiv.appendChild(loginContainer);

        // Add an event listener to the "Send OTP" button
        sendOTPButton.addEventListener('click', () => {
            const enteredPhoneNumber = String(mobileInput.value);

            if (/^\d{10}$/.test(enteredPhoneNumber)) {
                setPhoneNumber(enteredPhoneNumber);


                postData.phone = enteredPhoneNumber; // Update postData

                handleOtpRequest();

                // Remove the "Send OTP" button
                loginContainer.removeChild(sendOTPButton);
                loginContainer.removeChild(mobileInput);

                loginContainer.appendChild(otpInput);
                loginContainer.appendChild(verifyOTPButton);

                loginContainer.appendChild(changeNumberButton);
            }

        });

        verifyOTPButton.addEventListener('click', () => {
            handleVerifyRequest();
        });

        changeNumberButton.addEventListener('click', () => {

            //Add both previous button and inputfield
            loginContainer.appendChild(mobileInput);
            loginContainer.appendChild(sendOTPButton);

            //remove cuttent button and inputfield
            loginContainer.removeChild(changeNumberButton);

            loginContainer.removeChild(otpInput);
            loginContainer.removeChild(verifyOTPButton);
        });


    };




    const handleOnDragStart = (e) => e.preventDefault();


    const [selectedItem, setSelectedItem] = useState(0);

    const handleItemClick = (index) => {
        setSelectedItem(index);
        setIsExpanded(!isExpanded);
    };

    const [professionals, setProfessionals] = useState([]);


    const defaultServiceData = [
        {
            title: 'Hair Services', content:

                <>


                    <div className='service-card-1' >
                        Haircut
                        $25
                    </div>

                    <div className='service-card-1'  >
                        Barber Cut
                        $25
                    </div>
                    <div className='service-card-1'>
                        Cut & Style
                        $20
                    </div>

                    <div className='service-card-1'>
                        Shampoo Cut & Style
                        $30
                    </div>

                    <div className='service-card-1'>
                        Express Color(Toning, Gloss, Roots)
                        $35
                    </div>
                    <div className='service-card-1'>
                        Speciality Color
                        $35
                    </div>
                    <div className='service-card-1'>
                        Lightning Services
                        $35
                    </div>
                    <div className='service-card-1'>
                        Perms
                        $35
                    </div>
                    <div className='service-card-1'>
                        Shmapoo Style
                        $20
                    </div>
                </>

        },
        {
            title: 'Hair Removal', content:
                <>
                    <div className='service-card-1'>
                        Threading
                        $25
                    </div>
                    <div className='service-card-1'>
                        Waxing
                        $35
                    </div>


                </>
        },
        {
            title: 'Spa Facial', content:
                <>
                    <div className='service-card-1'>
                        Express Facials
                        $30
                    </div>

                    <div className='service-card-1'>
                        Papaya Facials
                        $50
                    </div>

                    <div className='service-card-1'>
                        Aleo & Cucumber
                        $50
                    </div>

                    <div className='service-card-1'>
                        Eng Rose
                        $50
                    </div>

                    <div className='service-card-1'>
                        Gold Facial
                        $70
                    </div>

                    <div className='service-card-1'>
                        Diamond
                        $70
                    </div>

                    <div className='service-card-1'>
                        Specialty Facials(Shehnaaz Hussein)
                        $85
                    </div>
                </>
        },
        {
            title: 'Color Services', content:
                <>
                    <div className='service-card-1'>
                        fafafa $69
                    </div>
                </>
        }



    ];

    const [serviceData, setServiceData] = useState(defaultServiceData);

    //fetching servicedata
    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                // Fetching service titles from the first endpoint
                const serviceTitlesResponse = await fetch('https://thorfinn.pythonanywhere.com/services/');
                const serviceTitlesData = await serviceTitlesResponse.json();

                // Fetching subservices for each title
                const subservicesPromises = serviceTitlesData.map(async (service) => {
                    const subservicesResponse = await fetch(`https://thorfinn.pythonanywhere.com/subservices/?service=${service.id}`);
                    const subservicesData = await subservicesResponse.json();


                    return {
                        title: service.title,
                        content: subservicesData.map((subservice) => (
                            <div className='service-card-1' key={subservice.id}>
                                {subservice.title}
                                ${subservice.price}
                            </div>
                        )),
                    };
                });

                // Resolve all promises for subservices
                const resolvedSubservices = await Promise.all(subservicesPromises);

                // Update serviceData state with the resolved data
                setServiceData(resolvedSubservices);
            } catch (error) {
                console.error('Error fetching service data:', error);
                // Set default data or handle error state
                setServiceData([]);
            }
        };

        fetchServiceData();
    }, []);

    const items = [
        'Haircut & Style',
        'Color Services',
        'Facial',
        'Hair Removal',
    ];
    const content = [
        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Haircut <br /> $28</p>
                <p className='list-detail-content'>Consult with our stylists to create a look that compliments your features and accents your personal style. </p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Barber Cut <br /> $35</p>
                <p className='list-detail-content'>Our expert barbers specialize in short hairstyles for women. Tailored, polished pixie cut or other short style.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Shampoo & Cut <br /> $35</p>
                <p className='list-detail-content'>Shampoo and precision haircut, Hair is cleansed, conditioned and cut wet for an impeccable look</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Shampoo, Cut & Style <br /> $40</p>
                <p className='list-detail-content'>Shampoo, expert cut and styling for a tailored, polished look.</p>
            </div>
        </div>,

        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Root Touch Up <br />$55</p>
                <p className='list-detail-content'>Our expert colorists precisely touch up your roots with high-quality color for a fresh, seamless look.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>All-over Color <br />Starting at $65</p>
                <p className='list-detail-content'>Update your entire hair color for a bold, vibrant look. Our colorists use high-quality color and the latest techniques.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Gloss <br />Starting at $30</p>
                <p className='list-detail-content'>Enhance shine and refresh faded color with a gloss treatment. Leaves hair vibrant, hydrated and healthy looking.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Toning <br />$30</p>
                <p className='list-detail-content'>Correct and neutralize unwanted color tones. Our expert color toning services restore your hair's natural vibrancy.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Accent Highlight/Balayage <br />$70</p>
                <p className='list-detail-content'>Add dimension with subtle, natural-looking highlights placed throughout the mid-lengths and ends.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Partial Highlight/Balayage <br />$120</p>
                <p className='list-detail-content'>Brighten and add depth to your hair with highlights focused on the top and crown area for a sunshine effect.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Full Highlight/Balayage <br />$170</p>
                <p className='list-detail-content'>Completely transform your look with highlights throughout for radiant, multi-dimensional color from roots to ends.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>All Over Bleach <br />$70</p>
                <p className='list-detail-content'>Lighten hair multiple shades with an all over bleach for a dramatic color transformation.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Specialty Color <br />Price Varies</p>
                <p className='list-detail-content'>Vibrant fashion shades like pastels, neons, or ombré. Consult on customized specialty coloring services and pricing.</p>
            </div>
        </div>,

        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Express Facial <br />$35</p>
                <p className='list-detail-content'>Deep cleanse, exfoliate, and hydrate your skin with this quick pick-me-up facial.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Papaya Facial <br />$50</p>
                <p className='list-detail-content'>Reveal bright, youthful skin with this antioxidant and Vitamin C enriched facial.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Aloe & Cucumber Facial <br />$50</p>
                <p className='list-detail-content'>Soothe and deeply hydrate dry skin with this cooling, calming facial.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>English Rose Facial <br />$50</p>
                <p className='list-detail-content'>Gently purify while combating breakouts with this clarifying rose facial.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Gold Facial <br />$70</p>
                <p className='list-detail-content'>Replenish your skin with ultra-hydrating and nourishing gold extracts.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Diamond Facial <br />$70</p>
                <p className='list-detail-content'>Resurface and renew with this results-driven facial using diamond powder.</p>
            </div>
        </div>,

        <div className='list-1-detail'>
            <div className='detail-1'>
                <p className='list-detail-heading'>Full Face <br />$35</p>
                <p className='list-detail-content'>Remove unwanted facial hair quickly and effectively with waxing.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Eyebrow <br />$10</p>
                <p className='list-detail-content'>Get perfectly shaped brows with precision hair removal by threading.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Upper Lip <br />$6</p>
                <p className='list-detail-content'>Gently remove upper lip hair through threading for smooth results.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Forehead <br />$6</p>
                <p className='list-detail-content'>Remove unwanted forehead and hairline hair with precision threading.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Cheeks <br />$6</p>
                <p className='list-detail-content'>Define your cheeks and jawline by removing unwanted facial hair through threading.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Chin <br />$6</p>
                <p className='list-detail-content'>Shape your chin area with unwanted hair removal by threading.</p>
            </div>
            <div className='detail-1'>
                <p className='list-detail-heading'>Side Burns <br />$8</p>
                <p className='list-detail-content'>Clean up and define sideburns with precision threading services.</p>
            </div>
        </div>
    ];


    // booking div
    const [isVisible, setIsVisible] = useState(false); // for booking div
    const [bookingHeader, setBookingHeader] = useState(""); //for heading in booking div
    const [serviceCard, setServiceCard] = useState(true);//for all the service types
    const [isAddon, SetAddon] = useState(null); //for add on cards
    const [proffVisible, setProffVisible] = useState(null); //for professional list
    const [selectedService, setSelectedService] = useState(null); // for the selected service type
    const [selectedItemKey, setSelectedItemKey] = useState(null); // for the key of selected service

    const [bookingDetail, setBookingDetail] = useState(null);
    const [orderbtn, setOrderbtn] = useState(null); //hiding and showing the choose time div
    const [isNextBtnVisible, SetNextBtnvisible] = useState(true);
    const [isLoading, setIsLoading] = useState('loading');// for loading animaiton

    const [clickedContents, setClickedContents] = useState([]); //storing the clicked content

    const [clickedServiceIndex, setClickedServiceIndex] = useState(null);

    const toggleBookingDiv = () => {


        setIsVisible(!isVisible);

        //for mobile screen
        if (!isVisible) {
            for (let i = 2; i <= 9; i++) {
                const contentElement = document.querySelector('.content-' + i);
                contentElement.classList.add('responsive-class'); // No dot here
            }

            document.querySelector('.nav-div').classList.add('responsive-class'); // No dot here
        }
        if (isVisible) {
            for (let i = 2; i <= 9; i++) {
                const contentElement = document.querySelector('.content-' + i);
                contentElement.classList.remove('responsive-class'); // No dot here
            }

            document.querySelector('.nav-div').classList.remove('responsive-class'); // No dot here
        }
        //bug-fix-2 date:28-11-2023
        //setServiceCard(true); // Reset selected card when toggling
        setProffVisible(null); // Show the .cards div

        SetIsSuccess(null);
        setIsTimeSelected(null);
        if (serviceCard) {
            setBookingHeader("Choose a service")
        }

    };
    const openChooseTime = (cardIndex, professional) => {

        //setServiceCard(cardIndex);
        setProffVisible(null); // Hide the .cards div
        setMinimized(true);
        setBookingDetail(true); //Booking
        setBookingHeader('Choose Time');
        setIsChooseTImeClicked(true);
        SetAddon(null);
        setOrderbtn(true);
        SetNextBtnvisible(null);



        if (bookingHeader == "Choose Time") {
            setMinimized(null);
        }

    };

    const closeChooseTime = () => {
        setIsChooseTImeClicked(null);
        //marked
        setMinimized(false);

        // setProffVisible(true);
        setBookingHeader('Choose Addons');

        SetNextBtnvisible(true);
        SetAddon(true);

    }

    const closeChooseTimeSkipAddon = () => {
        // sethighlited(null);
        setMinimized(false);
        setIsChooseTImeClicked(null);
        setBookingHeader('Choose Service');
        SetAddon(null);
        SetNextBtnvisible(true);

    }

    //close button for closing the service list
    const closeselectedcard = () => {
        setServiceCard(null);
        setProffVisible(true); // Show the .cards div
        setMinimized(false);
    };


    //to open the list of  service cards having service name and price
    const openServiceDetails = (serviceindex) => {

        //To Show the title of the service detail
        const title = serviceData[serviceindex].title;

        const content = (
            <div>

                <div className='card-title'>{title}</div>
            </div>
        );

        //last
        setSelectedService(serviceindex);

        // Create a new array where all states are set to false except the selected one.
        const updatedStates = serviceCardStates.map((state, index) => index === serviceindex);
        setServiceCardStates(updatedStates);


        setServiceCard(true);

    };


    const closeSelectedService = () => {
        sethighlited(null);
        //to get back
        setBookingDetail(false);//lastDD
        setSelectedService(null);

        setServiceCard(true);

        const filteredContents = clickedContents.filter(item => item.type !== 'content-3-style');
        // // Set the state with the new array
        setClickedContents(filteredContents);


    }


    //click of the service subtype (service subtype + price div)
    const openAddon = (serviceName, index, id) => {
        setBookingDetail(true);

        // setBookingDetail(true); //target
        //changes made here on 13-11-23
        setProffVisible(null);
        setSelectedService(null);
        setServiceCard(null);
        SetAddon(true);
        setBookingHeader("Choose Addons");
        // setMinimized(true);

        // const content3 = serviceName;

        if (true) {
            const subserviceId = id;
            const content3 = index;
            setClickedContents(
                prevContents => [...prevContents,
                {
                    type: 'content-3-style', value: content3, id: subserviceId, index: prevContents.filter(
                        item => item.type === 'content-3-style'
                    ).length
                },
                ]);
        }


        sethighlited(index);

        //if any div is highlited then setting the selected item list div to maximized
        if (highlited) {
            setMinimized(false);
        }

    };

    const skipAddon = (serviceName, index, id) => {
        setBookingDetail(true);
        setProffVisible(null);
        setServiceCard(null);
        sethighlited(null)
        // Assuming you need to add a new content-3-style item and remove all others
        const subserviceId = id;
        const content3 = index;

        // Filter out all previous content-3-style items
        const filteredContents = clickedContents.filter(item => item.type !== 'content-3-style');

        // Add the new content-3-style item to the filtered array
        setClickedContents([
            ...filteredContents,
            {
                type: 'content-3-style',
                value: content3,
                id: subserviceId,
                index: filteredContents.filter(item => item.type === 'content-3-style').length,
            },
        ]);
    };

    //for color toggle 
    const defaultaddonCards = [
        { name: 'Face Bleach', price: '$20' },
        { name: 'Derma Blade', price: '$30' },
        { name: 'Clay Mask', price: '$15' },
        { name: 'Extra Massage', price: '$25' },
        { name: 'Gua Sha 15 min Massage', price: '$35' },
        { name: 'Bleach Facial', price: '$40' },
    ];

    const [addonCards, setAddonCards] = useState([defaultaddonCards]);

    useEffect(() => {
        fetch('https://thorfinn.pythonanywhere.com/addons/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Assuming data is an array of objects with name and price properties
                setAddonCards(data);
            })
            .catch(error => {
                console.error('There was an error fetching data:', error);
            });
    }, []); // Empty dependency array ensures this effect runs only once

    // Rest of your component's logic



    const [selectedAddon, setSelectedAddon] = useState([]);


    const toggleSelectAddon = (addon) => {
        const existingIndex = selectedAddon.findIndex(selected => selected.title?.toLowerCase() === addon.title?.toLowerCase());

        if (existingIndex !== -1) {
            // Remove the addon if already selected
            const updatedAddons = [
                ...selectedAddon.slice(0, existingIndex),
                ...selectedAddon.slice(existingIndex + 1)
            ];
            setSelectedAddon(updatedAddons);
        } else {
            // Add the addon if not already selected
            setSelectedAddon(prev => [...prev, addon]);
        }
    };



    const handleAddonDelete = (addon) => {
        const updatedAddons = selectedAddon.filter(selected => selected.title !== addon.title);
        setSelectedAddon(updatedAddons);
    };

    const closeSelectedAddon = () => {
        //target
        //removing all subservices
        setClickedContents(prevContents => (
            prevContents.filter(item => item.type !== 'content-3-style')
        ));
        setBookingDetail(false)
        SetAddon(null);
        setSelectedService(true);
        // SetNextBtnvisible(false);

        setBookingHeader('Choose Service');
    }

    const OpenProfessional = () => {
        if (!proffVisible) {
            setOrderbtn(true);
            setBookingDetail(true);
            setProffVisible(true);
            setBookingHeader("Choose Professional")
            SetAddon(null);
        }

        SetNextBtnvisible(null);
    }

    const closeSelecteProff = () => {
        setProffVisible(null);
        setBookingHeader('Choose Addons');
        SetNextBtnvisible(true);
        SetAddon(true);
    }

    //for showing the sliced array to it's correct title
    const [serviceCardStates, setServiceCardStates] = useState(Array(serviceData.length).fill(false));

    const [highlited, sethighlited] = useState(null);
    const [minimized, setMinimized] = useState(false);

    const [isChooseTimeClicked, setIsChooseTImeClicked] = useState(null);


    const handleChooseTimeClick = () => {

        setIsChooseTImeClicked(!isChooseTimeClicked);
        handleMinimizeOrder();

        //for time conversion
        const convertTo24Hour = (time12h) => {
            const [time, modifier] = time12h.split(' ');

            let [hours, minutes] = time.split(':');

            if (hours === '12') {
                hours = '00';
            }

            if (modifier === 'PM') {
                hours = parseInt(hours, 10) + 12;
            }

            return `${hours}:${minutes}`;
        }

        //For Book Now
        if (isTimeSelected && isUser) {


            //for start time
            const parsedDate = new Date(selectedDate);
            const parsedTime = new Date(`1970-01-01T${convertTo24Hour(selectedTime)}`);
            const offset = parsedTime.getTimezoneOffset();

            // Combine date and time
            parsedDate.setHours(parsedTime.getHours());
            parsedDate.setMinutes(parsedTime.getMinutes() - offset);

            // Format the combined date and time into the required format (ISO string)
            const formattedDateTime = parsedDate.toISOString();

            console.log('formated time is ', formattedDateTime);

            //for selected addon id
            const selectedAddonIds = selectedAddon.map(item => item.id);
            console.log('formated addons is ', selectedAddonIds);

            //for selected sebservice id
            const content3Elements = clickedContents.filter(item => item.type === 'content-3-style')
            const selectedSubserviceIds = content3Elements[0].id;
            console.log('formated subservice is ', selectedSubserviceIds);

            //for selected professional id
            const content1Elements = clickedContents.filter(item => item.type === 'content-1-style')
            // const selectedProffID = selectedProfessionalIds[0]; target1
            const selectedProffID = 1;
            console.log('formated professional is ', selectedProffID);

            clickedContents.forEach((item, index) => {
                if (index === 0) return;

                const variableName = `item${index}`;
                window[variableName] = item;
            });

            // Create object with professional and items
            console.log("final clicked contents: ", clickedContents);
            console.log('final addons: ', selectedAddon);
            console.log('final time: ', selectedDate + " " + selectedTime);


            const data = {
                "addons": selectedAddonIds,
                "slot": {
                    "start_time": formattedDateTime
                },
                "cancelled": false,
                "user": 2,
                "subservice": selectedSubserviceIds,
            }


            const jsonBody = JSON.stringify(data);


            console.log('header token is : ', getCookie('token'));
            fetch('https://thorfinn.pythonanywhere.com/book/', {
                headers: {
                    'Authorization': `Token ${getCookie('token')}`,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: jsonBody
            })
                .then(response => {
                    if (response.status === 401) {
                        throw new Error('Auth failed: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            SetIsSuccess(true);

            setTimeout(() => {
                toggleBookingDiv();

                // Reload the page after 3 seconds
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }, 3000); // 3000 milliseconds = 3 seconds
        }


        //toggleBookingDiv();

        handleDateChange(date);

    }
    //to toggle the order list div up and down 
    const handleMinimizeOrder = () => {
        setMinimized(!minimized);
    }

    // Function to calculate total price from clickedContents and selectedAddon
    const calculateTotalPrice = () => {
        const clickedContentsTotal = clickedContents.reduce((accumulator, content) => {
            if (content.type === "content-3-style" && Array.isArray(content.value) && content.value.length >= 3) {
                const itemPrice = parseFloat(content.value[2]); // Assuming price is at index 2
                return accumulator + itemPrice;
            }
            return accumulator;
        }, 0);

        const addonTotal = selectedAddon.reduce((accumulator, addon) => {
            const addonPrice = parseFloat(addon.price); // Assuming price starts with '$'
            return accumulator + addonPrice;
        }, 0);

        return clickedContentsTotal + addonTotal;
    };

    // Use this function to get the total price
    const totalPrice = calculateTotalPrice();

    // Render the total price
    const total = (
        <div className="total-price">
            Total Price: ${totalPrice.toFixed(2)}
        </div>
    );

    //Storing the selected Time
    const [isTimeSelected, setIsTimeSelected] = useState(null);
    const [isSuccess, SetIsSuccess] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    // calander
    const [date, setDate] = useState(new Date()); // Initialize with today's date
    const [showTimeSlots1, setShowTimeSlots1] = useState(null);
    const [showTimeSlots2, setShowTimeSlots2] = useState(null);
    const [slotsData, setSlotsData] = useState(null);
    const today = new Date();
    const [timesForToday, setTimesForToday] = useState([]);

    useEffect(() => {
        // This function will run whenever timesForToday changes
        addHighlightClass();


    }, [timesForToday]);

    const addHighlightClass = () => {
        const elements = document.querySelectorAll('.time-slot-card');
        elements.forEach((element) => {
            const time24 = element.getAttribute('data-time24');
            if (timesForToday.includes(time24)) {
                element.classList.add('highlighted-time-slot');
            } else {
                element.classList.remove('highlighted-time-slot');
                element.disabled = false;
            }
        });
    };

    const handleDateChange = (newDate) => {
        setIsLoading(true); // Set isLoading to true when fetching starts

        setDate(newDate);
        //console.log(clickedContents);
        const selectedProfessional = clickedContents[1];

        if (newDate) {


            // Make a request to fetch slots for the selected professional and date
            fetch(`https://thorfinn.pythonanywhere.com/slots/`
            )
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();

                })
                .then(slotsData => {
                    // Handle slots data here, for example, update state or perform any necessary operations
                    // Set the received slots data to a state variable, if needed
                    setSlotsData(slotsData);
                    //for checking time slot
                    const today = new Date(newDate); // Create a new Date object based on the selected date
                    today.setDate(today.getDate() + 1); // Add one day to the selected date

                    const todayDate = today.toISOString().split('T')[0];

                    //Filter slots for today
                    const slotsForToday = slotsData.filter(slot => {
                        const slotDate = new Date(slot.start_time).toISOString().split('T')[0];
                        return slotDate === todayDate;
                    });

                    // If today's slots are found, log the times
                    if (slotsForToday.length > 0) {
                        const timesForToday = slotsForToday.map(slot => {
                            return slot.start_time.split('T')[1].slice(0, 5); // Extracting HH:MM from start_time
                        });
                        setTimesForToday(timesForToday);
                        console.log('Slots for today:', timesForToday);

                    } else {
                        console.log('No slots available for today.');
                        // Check if timesForToday doesn't include any time24 value
                        if (true) {
                            // Function to remove highlighted class from elements
                            document.querySelectorAll('.time-slot-card').forEach((element) => {
                                element.classList.remove('highlighted-time-slot');
                            });
                        }
                    }
                    setIsLoading(false); // after fetch is completed


                })
                .catch(error => {
                    setIsLoading(false); // after fetch is completed

                    console.error('Error fetching slots:', error);
                });


        }
        // Get today's date in YYYY-MM-DD format


        today.setDate(today.getDate() - 1)

        if (newDate >= today) {
            const day = newDate.getDay();
            if (day === 0 || day === 1) {
                if (day === 0) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Salon Closed',
                        text: 'Our salon is closed on Sundays. Please choose another day.',
                    });
                    setShowTimeSlots1(null);
                    setShowTimeSlots2(null);

                } else {
                    setShowTimeSlots1(null);
                    setShowTimeSlots2(true);
                }
            } else {
                setShowTimeSlots1(true);
                setShowTimeSlots2(null);
            }
        } else {
            setShowTimeSlots1(null);
            setShowTimeSlots2(null);
            Swal.fire({
                icon: 'error',
                title: 'Invalid Date',
                text: 'Please choose a date that is not in the past.',
            });
        }

    };

    const [calendarVisible, setCalendarVisible] = useState(true);


    // ... (array push button)
    const [isPushButtonVisible, setPushButtonVisible] = useState(false);
    //setPushButtonVisible(true);
    const handlePushButtonClick = () => {
        setPushButtonVisible(false);
        setMinimized(true);

        //storing the time
        const selectedDateElement = document.querySelector('.selected-date');
        if (selectedDateElement) {
            setSelectedDate(selectedDateElement.innerText);
        }

        //Displaying the Selected Time
        setIsTimeSelected(true);
    }
    const handleSelectedTimeClick = (timeSlot) => {
        // setPushButtonVisible(true);

        handlePushButtonClick();

        //storing the time
        setSelectedTime(timeSlot.time);


    }


    //add more button
    const addMoreItems = () => {
        // closeSelectedService();
        setBookingDetail(false);//last
        setSelectedService(null);
        sethighlited(null);
    }

    //time slots
    const timeSlots1 = [
        { icon: <BsSunrise />, time24: '10:00', time: '10:00 AM' },
        { icon: <BsSunrise />, time24: '11:00', time: '11:00 AM' },
        { icon: <BsSun />, time24: '12:00', time: '12:00 PM' },
        { icon: <BsSun />, time24: '13:00', time: '01:00 PM' },
        { icon: <BsSun />, time24: '14:00', time: '02:00 PM' },
        { icon: <BsSun />, time24: '15:00', time: '03:00 PM' },
        { icon: <BsSun />, time24: '16:00', time: '04:00 PM' },
        { icon: <BsSunset />, time24: '17:00', time: '05:00 PM' },
        { icon: <BsSunset />, time24: '18:00', time: '06:00 PM' },
    ];
    const timeSlots2 = [
        { icon: <BsSunrise />, time24: '10:00', time: '10:00 AM' },
        { icon: <BsSunrise />, time24: '11:00', time: '11:00 AM' },
        { icon: <BsSun />, time24: '12:00', time: '12:00 PM' },
        { icon: <BsSun />, time24: '13:00', time: '01:00 PM' },
        { icon: <BsSun />, time24: '14:00', time: '02:00 PM' },
        { icon: <BsSun />, time24: '15:00', time: '03:00 PM' },
        { icon: <BsSun />, time24: '16:00', time: '04:00 PM' },
        { icon: <BsSunset />, time24: '17:00', time: '05:00 PM' },
        { icon: <BsSunset />, time24: '18:00', time: '06:00 PM' },
    ];



    //For Content 2

    const animatedCards = document.querySelectorAll('.card-left, .card-right');

    animatedCards.forEach((card, index) => {
        let animated = false;

        // Define different scroll thresholds for desktop and mobile
        const thresholds = window.innerWidth < 768 ? [200, 350, 650, 950, 1450, 1800] : [300, 600, 1100, 1400, 1900, 2300];

        window.addEventListener('scroll', () => {
            const threshold = thresholds[index];

            if (!animated && window.scrollY > threshold) {
                animated = true;
                card.classList.add('animate');
            }
        });
    });


    //for content 3

    const [isContent3Animated, setIsContent3Animated] = useState(false);
    const myDivRef = useRef(null);

    useEffect(() => {
        if (isContent3Animated) {
        }
    }, [isContent3Animated]);

    useEffect(() => {
        if (!myDivRef.current) return;

        function handleDivIntersection(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsContent3Animated(true);
                    observer.disconnect();
                }
            });
        }

        const options = {
            root: null,
            rootMargin: "-150px",
            threshold: 0.1
        };

        const observer = new IntersectionObserver(handleDivIntersection, options);

        observer.observe(myDivRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);




    // For Content 4

    //carusel
    const ProffesonalsData = [
        <div className="gallery-item" data-value="1"><img src={image1} alt="hair company gallery image" /></div>,
        <div className="gallery-item" data-value="2"><img src={image2} alt="hair company gallery image" /> </div>,
        <div className="gallery-item" data-value="3"><img src={image3} alt="hair company gallery image" /> </div>,
        <div className="gallery-item" data-value="3"><img src={image4} alt="hair company gallery image" /> </div>,
        <div className="gallery-item" data-value="3"><img src={image5} alt="hair company gallery image" /> </div>,
    ];




    //For content 5

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleList = () => {
        setIsExpanded(!isExpanded);
    };

    //for content 7
    const galleryItems = [
        <div className="gallery-item" data-value="1"><img src={gallery1} alt="hair company gallery image" /></div>,
        <div className="gallery-item" data-value="2"><img src={gallery2} alt="hair company gallery image" /> </div>,
        <div className="gallery-item" data-value="3"><img src={gallery3} alt="hair company gallery image" /> </div>,
        <div className="gallery-item" data-value="4"><img src={gallery4} alt="hair company gallery image" /></div>,
        <div className="gallery-item" data-value="5"><img src={gallery5} alt="hair company gallery image" /> </div>,
        <div className="gallery-item" data-value="2"><img src={gallery6} alt="hair company gallery image" /> </div>,
        <div className="gallery-item" data-value="3"><img src={gallery7} alt="hair company gallery image" /> </div>,
        <div className="gallery-item" data-value="4"><img src={gallery8} alt="hair company gallery image" /></div>,
        <div className="gallery-item" data-value="5"><img src={gallery9} alt="hair company gallery image" /> </div>,
        <div className="gallery-item" data-value="5"><img src={gallery10} alt="hari company gallery image" /> </div>,

    ];


    const [isContent7Animated, setIsContent7Animated] = useState(false);
    const myDiv7Ref = useRef(null);

    useEffect(() => {
        if (isContent7Animated) {
        }
    }, [isContent7Animated]);

    useEffect(() => {
        if (!myDiv7Ref.current) return;

        function handleDivIntersection(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsContent7Animated(true);
                    observer.disconnect();
                }
            });
        }

        const options = {
            root: null,
            rootMargin: "-150px",
            threshold: 0.1
        };

        const observer = new IntersectionObserver(handleDivIntersection, options);

        observer.observe(myDiv7Ref.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    //for content 8

    const [isContent8Animated, setIsContent8Animated] = useState(false);
    const myDiv8Ref = useRef(null);

    useEffect(() => {
        if (isContent8Animated) {
        }
    }, [isContent8Animated]);

    useEffect(() => {
        if (!myDiv8Ref.current) return;

        function handleDivIntersection(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsContent8Animated(true);
                    observer.disconnect();
                }
            });
        }

        const options = {
            root: null,
            rootMargin: "-150px",
            threshold: 0.1
        };

        const observer = new IntersectionObserver(handleDivIntersection, options);

        observer.observe(myDiv8Ref.current);

        return () => {
            observer.disconnect();
        };
    }, []);


    const openExternalLink = () => {
        window.open('https://thehaircompanypsc.square.site/', '_blank');
    };

    return (
        <div className='home-page'>

            <div className='content-1' id="content1"  >

                <div className='tagline'><p >We provide you the best experience which your hair <span>loves</span></p>

                    <div className='container'>

                        {/* <div className='book-btn' onClick={toggleBookingDiv} id='content4'>
                            Book Now
                        </div> */}

                        <div className='book-btn' onClick={openExternalLink} id='content4'>
                            Book Now
                        </div>


                        {isVisible && (
                            <div id='parent-div' className={`animated-div  scrollbar ${isVisible ? 'slide-in' : 'slide-out'} ${minimized ? 'animated-div-overflow-hidden' : ''}`}                            >
                                {/* booking header div */}
                                <div className='header-container'>
                                    <div className='book-header'>
                                        <h3>{bookingHeader}</h3>

                                        <button className='close-btn' onClick={toggleBookingDiv}>
                                            Close
                                            {/* <AiOutlineClose className='close-icon' /> */}
                                        </button>
                                    </div>
                                </div>


                                {/* this div has all the service types listed*/}
                                {serviceCard !== null && (
                                    <div className='expanded-card-1 scrollbar '>
                                        {/* <button className='close-btn ' onClick={closeselectedcard}>
                                            <AiOutlineClose className='close-icon' />
                                        </button> */}
                                        <div className='service-cards menu-1'>
                                            {serviceData.map((service, serviceindex) => (
                                                <div
                                                    key={serviceindex}
                                                    className={` ${selectedService === serviceindex ? 'selected' : ''
                                                        } ${clickedServiceIndex === serviceindex ? 'clicked' : ''}`}
                                                    onClick={() => openServiceDetails(serviceindex)}
                                                >
                                                    <div className='service-card-name'>
                                                        <div className='service-card-name-icon'>
                                                            <div>
                                                                {serviceindex === 0 ? <GiHairStrands /> :
                                                                    (serviceindex === 1 ? <PiMaskHappyThin /> :
                                                                        (serviceindex === 3 ? <IoColorPalette /> : <GiCharcuterie />)
                                                                    )
                                                                }
                                                            </div>
                                                            <p>{service.title} </p>
                                                        </div>

                                                        <div><IoIosArrowForward />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* this div has all the types of services  prices */}
                                {selectedService !== null && (
                                    <div className='expanded-card scrollbar' key='uniqueKey'>
                                        {serviceData.map((service, index) => (
                                            serviceCardStates[index] && (
                                                <div key={index} style={{ color: 'black', marginBottom: '100px' }} className="service-cards">
                                                    <div className='sub-header'>
                                                        <button className='close-btn' onClick={closeSelectedService}>
                                                            {/* <AiOutlineClose className='close-icon' /> */}
                                                            <IoIosArrowBack className='back-icon' />
                                                        </button>
                                                        <h4 style={{ color: 'black' }}>{service.title}</h4>
                                                    </div>
                                                    {service.content && service.content.length > 0 ? (
                                                        service.content.map((item, i) => {
                                                            const itemKey = parseInt(item.key);
                                                            if (itemKey === 5) {
                                                                return (
                                                                    <React.Fragment key={i}>
                                                                        <p style={{ fontWeight: '500', color: "grey", fontSize: 'large' }}>Party Facials</p>
                                                                        <div
                                                                            onClick={() => {
                                                                                openAddon(index, item.props.children, item.key);
                                                                            }}
                                                                            className={`service-card-1 ${highlited === i ? 'selected' : ''}`}
                                                                        >
                                                                            <span className="service-name">{item.props.children[0]}</span>
                                                                            <span className="service-price">${item.props.children[2]}</span>
                                                                        </div>
                                                                    </React.Fragment>
                                                                );
                                                            }
                                                            return (
                                                                <div
                                                                    key={i}
                                                                    onClick={() => {
                                                                        if (itemKey >= 1 && itemKey <= 6) {
                                                                            openAddon(index, item.props.children, item.key);
                                                                        } else {
                                                                            skipAddon(index, item.props.children, item.key);
                                                                            setSelectedAddon([]);
                                                                        }
                                                                        sethighlited(i); // Highlight the clicked item
                                                                    }}
                                                                    className={`service-card-1 ${highlited === i ? 'selected' : ''}`}
                                                                >
                                                                    <span className="service-name">{item.props.children[0]}</span>
                                                                    <span className="service-price">${item.props.children[2]}</span>
                                                                </div>
                                                            );
                                                        })
                                                    ) : (
                                                        <p>No content available</p>
                                                    )}
                                                </div>
                                            )
                                        ))}
                                    </div>
                                )}





                                {/* This div has all the add-on service cards  */}
                                {
                                    isAddon !== null && (
                                        <div className='Add-on-div scrollbar'>

                                            <div style={{ display: 'block', width: '100%' }}>
                                                <button className='close-btn' onClick={closeSelectedAddon} >
                                                    {/* <AiOutlineClose className='close-icon' /> */}
                                                    <IoIosArrowBack className='back-icon' />

                                                </button>
                                            </div>

                                            {addonCards.map(addon => (
                                                <div
                                                    className="service-card-1 addons"
                                                    onClick={() => toggleSelectAddon(addon)}
                                                    style={{
                                                        background: selectedAddon.some(selected =>
                                                            selected.title?.toLowerCase() === addon.title?.toLowerCase()
                                                        )
                                                            ? 'rgb(224, 224, 224)'
                                                            : ''
                                                    }}
                                                    key={addon.title}
                                                >
                                                    <span className='service-name'>{addon.title || 'Title not available'}</span>
                                                    <span className='service-price'>${addon.price || 'Price not available'}</span>
                                                </div>
                                            ))}




                                            <div onClick={OpenProfessional}></div>
                                        </div>


                                    )
                                }

                                {/* To open the div Having calendar and time slots */}
                                {isChooseTimeClicked !== null && (

                                    <div className='expanded-card scrollbar choose-time-div' >
                                        <button className='close-btn' onClick={() => {
                                            if (clickedContents[0].id >= 1 && clickedContents[0].id <= 6) {
                                                closeChooseTime();
                                            }
                                            else {
                                                closeChooseTimeSkipAddon();
                                            }
                                        }}

                                        >
                                            {/* <AiOutlineClose className='close-icon' /> */}
                                            <IoIosArrowBack className='back-icon' />

                                        </button>

                                        {calendarVisible !== null && (
                                            <div className='date-picker'>
                                                <Calendar
                                                    onChange={handleDateChange}
                                                    value={date}
                                                />
                                            </div>
                                        )}

                                        {showTimeSlots1 !== null && (
                                            <div >

                                                {/* This div will be shown for today or future dates */}
                                                <div className='Time-slots-header'>
                                                    <div className='Time-slots-header-text'><p>All Available Times</p></div>
                                                    <div className='selected-date'>{date.toDateString()}</div>
                                                </div>
                                                <div className='Time-slots'>

                                                    {isLoading ? (
                                                        <div className='loading-animation'></div>
                                                    ) : (
                                                        timeSlots1.map((timeSlot, index) => (
                                                            <div
                                                                className='time-slot-card'
                                                                key={index}
                                                                data-time24={timeSlot.time24}
                                                                onClick={() => handleSelectedTimeClick(timeSlot)}
                                                            >
                                                                {timeSlot.icon} {timeSlot.time}
                                                            </div>
                                                        ))
                                                    )}
                                                </div>

                                            </div>
                                        )}
                                        {showTimeSlots2 !== null && (

                                            <div >

                                                {/* This div will be shown for today or future dates */}
                                                <div className='Time-slots-header'>
                                                    <div className='Time-slots-header-text'><p>All Available Times</p></div>
                                                    <div className='selected-date'>{date.toDateString()}</div>
                                                </div>
                                                <div className='Time-slots'>
                                                    <div className='Time-slots'>
                                                        {isLoading ? (
                                                            <div className='loading-animation'></div>
                                                        ) : (
                                                            timeSlots2.map((timeSlot, index) => (
                                                                <div
                                                                    className={`time-slot-card`}
                                                                    key={index}
                                                                    data-time24={timeSlot.time24}

                                                                    onClick={() => handleSelectedTimeClick(timeSlot)}
                                                                >
                                                                    {timeSlot.icon} {timeSlot.time}
                                                                </div>
                                                            ))
                                                        )}
                                                    </div>

                                                </div>
                                            </div>
                                        )}

                                    </div>
                                )}

                                {/* Pushing items to cart */}
                                {isPushButtonVisible && (
                                    <div>
                                        <h4 style={{ color: 'white' }}>Are You Sure? </h4>
                                        <button className='CartPush' id="myButton" onClick={handlePushButtonClick}>
                                            <TiTick className='tick' />
                                        </button>
                                    </div>

                                )}

                                <div className={`clicked-div-content ${bookingDetail ? (minimized ? 'clicked-div-content-active' : '') : 'hidden'}`} >
                                    <div className='clicked-div-content-header'>
                                        <h2>Your Order </h2>

                                        {/* {isNextBtnVisible != null && (<div onClick={OpenProfessional} className='button-48 btn-modified'><span className='text'>Next</span></div>)} */}

                                        {isNextBtnVisible != null && (<div onClick={openChooseTime} className='button-48 btn-modified'><span className='text'>Next</span></div>)}


                                        <button onClick={handleMinimizeOrder} className='button-28'>
                                            {minimized ? <MdExpandMore /> : <MdExpandLess />}
                                        </button>


                                    </div>

                                    <ul className='array-info'>
                                        <div>
                                            {/* Render the contents of clickedContents */}

                                            {clickedContents.map((content, index) => {
                                                //delete function
                                                const handleDelete = () => {
                                                    // Implement logic to remove the clicked item
                                                    const updatedContents = clickedContents.filter((_, i) => i !== index);
                                                    setClickedContents(updatedContents);
                                                };
                                                if (content.type === "content-3-style") {
                                                    return (

                                                        <div key={index} className={content.type} >

                                                            <span className='content-3-style'>{content.value[0]}</span>
                                                            <span className="pricing">${content.value[2]}</span>
                                                            {/* <p>{content.id for id of subbservice}</p> */}
                                                            {/* <button onClick={handleDelete} className='order-div-button'>Delete</button> */}

                                                        </div>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <li key={index} className={`content.type proffname`}>
                                                            By: {content.value}
                                                            {/* content.id for proff id */}
                                                        </li>
                                                    )

                                                }
                                            })}

                                            <h2>Addons</h2>

                                            {selectedAddon.map((addon, index) => (
                                                <div key={index} className=" content-3-style">
                                                    {/* addon.id for id */}
                                                    <span className='content-3-style'>{addon.title}</span>
                                                    <span className='pricing'>${addon.price}</span>
                                                    <button onClick={() => handleAddonDelete(addon)} className='order-div-button'>Delete</button>
                                                </div>
                                            ))}


                                            {isTimeSelected != null && (
                                                <div className='selected-date-time content-3-style'>
                                                    {selectedDate + ' '}
                                                    {'at ' + selectedTime}
                                                </div>)
                                            }


                                            <div className='total-price'>
                                                {total}
                                            </div>



                                        </div>

                                    </ul>


                                    {orderbtn !== null && (
                                        <div className='bug-btn'>
                                            {!isTimeSelected ?
                                                <button className="button-48" onClick={handleChooseTimeClick} role="button"><span className="text">Choose Time</span></button>
                                                : !isUser ? <button className="button-48" onClick={handleLoginClick} role="button"><span className="text">Login </span></button>
                                                    : <button className="button-48" onClick={handleChooseTimeClick} role="button"><span className="text">Book Now</span></button>}
                                        </div>
                                    )}




                                    {orderbtn == null && (
                                        <button className='button-48' onClick={openChooseTime}><span className='text'>Choose Time</span></button>
                                    )}





                                </div>


                                {isSuccess && (
                                    <div class="success-animation">
                                        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                        </svg>

                                        <p>Success</p>
                                    </div>
                                )}

                            </div>
                        )}
                    </div>
                </div>

            </div>

            <div className='content-2' id='content2'>

                <head>
                    <meta name="description" content="Explore the premium services offered at The Hair Company. From expert hair services to rejuvenating spa facials and advanced hair removal treatments, discover a world of beauty and self-care." />
                    <meta name="keywords" content="hair services, spa facials, hair removal, beauty salon, self-care" />
                    <meta name="author" content="The Hair Company" />
                </head>

                <h1>SERVICES WE OFFER</h1>
                <div className='cards'>
                    <div className='card-1 card-left'>

                        <div className='card-img'></div>
                        <div className='card-info-left'>
                            <h3>Hair Services</h3>
                            <p><strong>Step into our salon, where our highly skilled team of hair care experts</strong>  </p> <p>elevates the art of hairstyling to new heights. With a collective passion for innovation and a commitment to excellence.</p>

                            <p>Through years of honing their craft, our experts have mastered the intricate details of hairstyling. Their keen eye for trends and unwavering dedication to continual learning ensure that you receive not just a service, but a personalized journey towards your perfect look.</p>

                            {/* <p>From the moment you sit in our chairs, expect more than a simple haircut or color treatment. Our professionals engage in thoughtful consultations, taking the time to understand your preferences, lifestyle, and personality. This thorough understanding enables them to tailor their expertise to your unique needs.</p>

                            <p>Our comprehensive range of services encompasses:</p> */}

                        </div>
                    </div>
                    <div className='card-2 card-right'>
                        <div className='card-info-right'>
                            <h3>Facials</h3>

                            <p><strong>Indulge in our rejuvenating facials, where tranquility meets skincare perfection.</strong>
                            </p>  <p>Our expert estheticians bring together a harmonious blend of luxurious treatments and cutting-edge techniques.
                            </p>

                            <p>
                                Relax as our professionals meticulously analyze your skin, customizing each facial to address your unique needs. With an array of specialized products and personalized approaches, we ensure an experience that's not just skin deep but also soul-soothing.
                            </p>

                            {/* <p>
                                Our facials transcend the ordinary by incorporating therapeutic practices and tailored solutions. Whether it's hydration, anti-aging, or rejuvenation, our treatments are designed to restore your skin's natural radiance and vitality.
                            </p>

                            <p>
                                At our spa, you'll encounter an oasis of tranquility where every facial is a fusion of luxury and transformation, leaving you with a renewed sense of well-being.
                            </p> */}
                        </div>
                        <div className='card-img'></div>
                    </div>
                    <div className='card-3 card-left'>
                        <div className='card-img'></div>
                        <div className='card-info-left'>
                            <h3>Hair Removal</h3>
                            <p>
                                <span>Experience the epitome of smoothness and confidence with our hair removal services.</span> </p>
                            <p>  Our proficient technicians employ advanced techniques and top-quality products to ensure a hair-free experience .
                            </p>

                            <p>
                                Whether it's waxing, threading, or laser treatments, our specialists prioritize precision and care, delivering exceptional results tailored to your preferences.
                            </p>

                            {/* <p>
                                At our salon, we prioritize your comfort and satisfaction. We provide a serene and hygienic environment for your hair removal sessions, ensuring a stress-free and relaxing experience.
                            </p>

                            <p>
                                Step into our sanctuary of beauty and bid farewell to unwanted hair. Our commitment to excellence ensures that each hair removal session is not just a treatment but a step towards your self-assured glow.
                            </p> */}
                        </div>
                    </div>

                </div>

            </div>



            <div className="content-7" id='content7' ref={myDiv7Ref}>
                {/* problem */}

                <head>
                    <meta name="description" content="Explore the stunning gallery of The Hair Company. Browse through images showcasing our premium salon services, expert hairstyling, and tranquil spa environment." />
                    <meta name="keywords" content="salon gallery, hair services images, spa environment, beauty salon photos" />
                    <meta name="author" content="The Hair Company" />
                </head>

                <h1>Check Our Gallery</h1>

                <CustomCarousel items={galleryItems} className="content-7-carousel" />

            </div>

            <div className="content-3" id="content3" ref={myDivRef}>
                {/* problem */}
                <div className={`content-3-img ${isContent3Animated ? 'slideInLeft' : ''}`}></div>
                <div className={`content-3-info ${isContent3Animated ? 'slideInRight' : ''}`}>
                    <h1>ABOUT US</h1>
                    <p>
                    Our experts have honed their craft over years of dedicated practice, <br />
                     mastering the intricate details of hairstyling and staying abreast <br />
                      of the latest trends. When you entrust us with your hair, <br /> you embark on a personalized journey towards your <br /> perfect look, guided by our keen eye for detail and commitment to <br />continual learning.


                    </p>
                </div>
            </div>

            <div className="content-4">
                {/* problem */}
                <h1>Our Talanted Staff</h1>

                <ProfessionalCarousel items={ProffesonalsData} className="content-7-carousel" />

            </div>




            <div className="content-5" id='content5'>
                <h1>Our Prices</h1>

                <div className='list-details'>

                    <div>
                        <ul className='list-title'>
                            {items.map((item, index) => (
                                <li key={index} onClick={() => handleItemClick(index)}
                                    className={selectedItem === index ? 'selected' : ''}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>


                        <div className="list-group">
                            <div className="list-group-item" onClick={toggleList}>
                                Service List <p style={{ visibility: 'hidden', display: 'inline' }}>lal</p> <BsChevronBarExpand />
                            </div>
                            <ul className={`list-group-content ${isExpanded ? 'expanded' : 'not-expanded'}`}>
                                {items.map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleItemClick(index)}
                                        className={selectedItem === index ? 'selected' : ''}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            {selectedItem !== null && <div>{content[selectedItem]}</div>}
                        </div>
                    </div>

                </div>

                <button className='book-slot-btn' onClick={openExternalLink}><p>Book Your Slot</p></button>
            </div>

            <div className="content-6">
                {/* problem */}
                <h1>TESTIMONIALS</h1>

                <AliceCarousel className='content-6-box' >
                    <div onDragStart={handleOnDragStart} className='content-6-card'>

                        <p>
                            All of my experiences at the hair place today was fine the haircut <br />
                            she did perfect then I went in and then had my eyebrows done thanks for the <br />
                            great job.

                        </p>
                        <img className='content-6-img img1' />


                        <p>~Cherry</p>
                    </div>
                    <div onDragStart={handleOnDragStart} className='content-6-card'>

                        <p>
                            Went in there with my partner to get our eye brows threaded. <br />
                            It was the most amazing service and kind people. <br />
                            They make you feel so invited and welcome. <br />
                            I highly recommend this place to others..


                        </p>
                        <img className='content-6-img img2' />
                        <p>~Kimberly Lynn</p>
                    </div>
                    <div onDragStart={handleOnDragStart} className='content-6-card'>

                        <p>
                            The trendsetting Silk Press has become the ultimate choice for <br />
                            achieving sleek hair, crafting a safeguarding coat around every <br />
                            single strand. This enriching procedure combats frizz and fosters <br />
                            a radiant sheen. This enriching treatment rejuvenates your hair <br />
                            against everyday pressures, infusing additional moisture for <br />
                            luminous, robust hair. <br />

                        </p>
                        <img className='content-6-img img3' />
                        <p>~Luna</p>
                    </div>
                    <div onDragStart={handleOnDragStart} className='content-6-card'>

                        <p>
                            Glossy hair, sought-after by many, the Japanese Straightening <br />
                            technique is renowned for enveloping each strand with a <br />
                            protective shield, effectively eliminating frizz and enhancing <br />
                            luminous brilliance. This nutrient-packed treatment shields your <br />
                            strands from daily life challenges, providing extra hydration <br />
                            for glossy, resilient hair. <br />

                        </p>
                        <img className='content-6-img img4' />
                        <p>~Jade</p>
                    </div>
                </AliceCarousel>
            </div>


            <div className="content-8" ref={myDiv8Ref}>
                {/* problem */}
                <h1>Our Partnership</h1>
                <div className='content-8-body'>
                    <div className={`content-8-info ${isContent8Animated ? 'slideInInfo' : ''}`}>
                        <h2>WE WORK WITH THE <br /> BEST PARTNERS</h2>
                        <p>Experience beauty like never before with our salon's exclusive partnerships. Our commitment to excellence is fueled by collaborations with the industry's finest. Discover the best in beauty with our trusted partners.</p>
                        {/* <button>READ MORE</button> */}
                    </div>
                    <div className={`content-8-images ${isContent8Animated ? 'slideInImages' : ''}`} >
                        <div className='content-8-images-img1'></div>
                        <div className='content-8-images-img2'></div>
                        <div className='content-8-images-img3'></div>
                        <div className='content-8-images-img4'></div>
                    </div>

                </div>
            </div>

            <div className="content-9">

                <div>
                    <h2>About our store</h2>
                    <p>
                        Welcome to our salon, nestled in the heart of Pasco, WA, <br /> at 3411 W Court St. Here, we invite you <br /> to step into a realm where the art of <br /> hairstyling is elevated to new heights <br /> by our highly skilled team of hair care experts. <br />
                        With a collective passion for innovation and <br /> an unwavering commitment to excellence, we strive <br /> to create an experience that transcends mere  <br />beauty services.
                     </p>   
                </div>
                <div>

                    <h2>Contact Details</h2>
                    <div>
                        <p> <ImLocation /> 3411 W Court St
                            Pasco, WA 99301

                        </p>
                        <p> <IoCallOutline />
                            (509) 547-0580
                        </p>
                        <p> <PiPaperPlaneTiltLight /> info@thehaircompany.com</p>
                    </div>
                    <div>
                        <h2>Follow Us</h2>
                        <ul>
                            <li> <AiOutlineInstagram className='icons' /> </li>
                            <li><AiOutlineWhatsApp className='icons' /></li>
                            <li><AiOutlineFacebook className='icons' /></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h2>Opening Time</h2>
                    <div className='lines'>
                        <table></table>
                        <table></table>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th className='th' colSpan={2}>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Monday</td>
                                <td><p>10:00 -- 6:00</p></td>
                            </tr>
                            <tr>
                                <td>Tuesday</td>
                                <td>10:00 -- 6:00</td>
                            </tr>
                            <tr>
                                <td>Wednesday</td>
                                <td>10:00 -- 6:00</td>
                            </tr>
                            <tr>
                                <td>Thursday</td>
                                <td>10:00 -- 6:00</td>
                            </tr>
                            <tr>
                                <td>Friday</td>
                                <td>10:00 -- 6:00</td>
                            </tr>
                            <tr>
                                <td>Saturday</td>
                                <td>10:00 -- 6:00</td>
                            </tr>
                            <tr>
                                <td>Sunday</td>
                                <td>Closed</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
};


export default HomePage;
