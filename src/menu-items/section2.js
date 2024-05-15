// assets
import { IconKey } from '@tabler/icons-react';

import AirlineSeatReclineNormalOutlinedIcon from '@mui/icons-material/AirlineSeatReclineNormalOutlined';

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import RvHookupOutlinedIcon from '@mui/icons-material/RvHookupOutlined';
// constant
const icons = {
    IconKey,

    AirlineSeatReclineNormalOutlinedIcon,
    LocalShippingOutlinedIcon,
    RvHookupOutlinedIcon
};

const section2 = {
    id: 'section2',
    title: 'Management',
    type: 'group',
    children: [
        {
            id: 'Drivers',
            title: 'Drivers',
            type: 'collapse',
            icon: icons.AirlineSeatReclineNormalOutlinedIcon,

            children: [
                {
                    id: 'createDriver',
                    title: 'Add Driver',
                    type: 'item',
                    url: '/addDriver',
                    breadcrumbs: false
                },
                {
                    id: 'viewDrivers',
                    title: 'Manage Drivers',
                    type: 'item',
                    url: '/drivers',
                    breadcrumbs: false
                }
            ]
        },

        {
            id: 'trucks',
            title: 'Trucks',
            type: 'collapse',
            icon: icons.LocalShippingOutlinedIcon,

            children: [
                {
                    id: 'createTruck',
                    title: 'Add Truck',
                    type: 'item',
                    url: '/addTruck',
                    breadcrumbs: false
                },
                {
                    id: 'viewtrucks',
                    title: 'Manage Trucks',
                    type: 'item',
                    url: '/trucks',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'Trailers',
            title: 'Trailers',
            type: 'collapse',
            icon: icons.RvHookupOutlinedIcon,

            children: [
                {
                    id: 'createTrailer',
                    title: 'Add Trailer',
                    type: 'item',
                    url: '/addTrailer',
                    breadcrumbs: false
                },
                {
                    id: 'viewTrailers',
                    title: 'Manage Trailers',
                    type: 'item',
                    url: '/trailers',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default section2;
