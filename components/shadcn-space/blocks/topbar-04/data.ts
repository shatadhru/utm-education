import { BringToFront, CalendarHeart, ChartColumnBig, CircleArrowDown, Flag, Form, GalleryVerticalEnd, Grid2x2Plus, LayersPlus, PanelRightClose, Pentagon, Presentation, RectangleCircle, Shapes, Shredder, Zap, Phone, MessageSquare, Notebook, Calendar, Mail, Ticket, SquareKanban, Sparkles, User, ReceiptText, Newspaper, Type, List, CheckSquare, CircleDot, Square, LayoutPanelLeft } from "lucide-react";
import BackpackBoldDuotoneIcon from '@iconify-react/solar/backpack-bold-duotone';
import AirbudsCaseChargeBoldDuotoneIcon from '@iconify-react/solar/airbuds-case-charge-bold-duotone';
import HomeLinearIcon from '@iconify-react/solar/home-linear';
import Flag2BoldIcon from '@iconify-react/solar/flag-2-bold';
import VideoLibraryLineDuotoneIcon from '@iconify-react/solar/video-library-line-duotone';

import PlayStreamOutlineIcon from '@iconify-react/solar/play-stream-outline';
import CartLargeBoldDuotoneIcon from '@iconify-react/solar/cart-large-bold-duotone';
import BatteryChargeBrokenIcon from '@iconify-react/solar/battery-charge-broken';

import PlayStreamBrokenIcon from '@iconify-react/solar/play-stream-broken';

import PlayCircleLinearIcon from '@iconify-react/solar/play-circle-linear';

import BoxBrokenIcon from '@iconify-react/solar/box-broken';



























const NavData: unknown[] = [
    {
        type: "dropdown",
        label: "Dashboards",
        icon: HomeLinearIcon,
  color: "text-yellow-500",
        items: [
            { label: "UTM Academy", icon: BackpackBoldDuotoneIcon, href: "#" , iconColor: "text-green-600" },
            { label: "UTM Classroom", icon: AirbudsCaseChargeBoldDuotoneIcon, href: "#",  iconColor: "text-yellow-500" },
        ],
    },
    {
        type: "dropdown",
        label: "এস এস সি",
        icon: PlayStreamOutlineIcon,
        items: [
            { label: "এস এস সি ২০২৭", icon: BoxBrokenIcon, href: "#" ,iconColor: "text-blue-600" },
            { label: "এস এস সি ২০২৮", icon: BoxBrokenIcon, href: "#", iconColor: "text-purple-600" },
            { label: "এস এস সি ২০২৯", icon: BoxBrokenIcon, href: "#" , iconColor: "text-orange-600" },
        ]
    },
    {
        type: "dropdown",
        label: "ক্লাসরুম",
        icon: VideoLibraryLineDuotoneIcon,
        items: [
            { label: "রেকর্ডেড", icon: PlayCircleLinearIcon, href: "#"  ,iconColor: "text-orange-600"  },
            { label: "লাইভ", icon: PlayStreamBrokenIcon, href: "#"  ,iconColor: "text-red-600" },
           
        ]
    },
    {
        type: "dropdown",
        label: "UTM সপ",
        icon: CartLargeBoldDuotoneIcon,
        items: [
            { label: "ফ্রি কোর্স", icon: BatteryChargeBrokenIcon, href: "#" ,iconColor: "text-red-600" },
            { label: "বেসিক টু প্রিমিয়াম", icon: BatteryChargeBrokenIcon, href: "#",iconColor: "text-teal-600"  },
            { label: "এক্সট্রিম রিভিশন", icon: BatteryChargeBrokenIcon, href: "#" ,iconColor: "text-green-600"  },
            { label: "হাই ভোল্টেজ রিভিশন", icon: BatteryChargeBrokenIcon, href: "#" ,iconColor: "text-orange-600"  },
            { label: "বুলেট এমসিকিউ", icon: BatteryChargeBrokenIcon, href: "#" ,iconColor: "text-purple-600" },
           
        ]
    },
    
]

export default NavData;