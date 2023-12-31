import Logo from '../assets/logo-no-background.svg'
import DarkNav from '../assets/dark-nav.png'
import LightNav from '../assets/white-nav.png'
import DefaultImage from '../assets/logo-white.svg'

import { BsFillSunFill as LightMode, BsFillMoonFill as DarkMode } from 'react-icons/bs' 
import { BiSolidMessageAltDetail as MessageIcon, BiSolidSend as SendIcon } from 'react-icons/bi'
import { IoMdNotifications as NotificationIcon } from 'react-icons/io'
import { FaQuestionCircle as FaqIcon, FaUserFriends as FriendIcon } from 'react-icons/fa'
import { AiOutlineCloseSquare as CloseIcon } from 'react-icons/ai'
import { RiUserSettingsFill as SettingsIcon } from 'react-icons/ri'
import { IoLocationSharp as LocationIcon } from 'react-icons/io5'
import { MdWork as WorkIcon } from 'react-icons/md'
import { BsLinkedin as LinkedInIcon} from 'react-icons/bs'
import { FaSquareXTwitter as TwitterIcon } from 'react-icons/fa6'
import { BiSolidEditAlt as EditIcon } from 'react-icons/bi'
import { MdPersonAddAlt1 as AddIcon } from 'react-icons/md'
import { BsFillFileEarmarkImageFill as UploadImageIcon } from 'react-icons/bs'
import { AiFillLike as LikeIcon } from 'react-icons/ai'
import { SiGoogleanalytics as AnalyticsIcon } from 'react-icons/si'


const DJANGO_BASE_URL = 'http://127.0.0.1:8000'


export {
    Logo,
    LightMode,
    DarkMode,
    MessageIcon,
    NotificationIcon,
    FaqIcon,
    DarkNav,
    LightNav,
    CloseIcon,
    DefaultImage,
    SettingsIcon,
    LocationIcon,
    WorkIcon,
    TwitterIcon,
    LinkedInIcon,
    EditIcon,
    AddIcon,
    UploadImageIcon,
    LikeIcon,
    DJANGO_BASE_URL,
    FriendIcon,
    SendIcon,
    AnalyticsIcon
}