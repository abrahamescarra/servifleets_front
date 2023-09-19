// assets
import { IconKey } from '@tabler/icons';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
// constant
const icons = {
    IconKey,
    GroupOutlinedIcon,
    Inventory2OutlinedIcon,
    AttachMoneyOutlinedIcon,
    ReceiptOutlinedIcon
};

const section1 = {
    id: 'section1',
    title: 'Orders',
    type: 'group',
    children: [
        {
            id: 'customers',
            title: 'Customers',
            type: 'collapse',
            icon: icons.GroupOutlinedIcon,

            children: [
                {
                    id: 'createCustomer',
                    title: 'Add Customer',
                    type: 'item',
                    url: '/addCustomer',
                    breadcrumbs: false
                },
                {
                    id: 'viewCustomers',
                    title: 'Manage Customers',
                    type: 'item',
                    url: '/customers',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'Loads',
            title: 'Loads',
            type: 'collapse',
            icon: icons.Inventory2OutlinedIcon,

            children: [
                {
                    id: 'createLoad',
                    title: 'Add Load',
                    type: 'item',
                    url: '/addLoad',
                    breadcrumbs: false
                },
                {
                    id: 'viewLoads',
                    title: 'Manage Loads',
                    type: 'item',
                    url: '/loads',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'Invoices',
            title: 'Invoices',
            type: 'collapse',
            icon: icons.ReceiptOutlinedIcon,

            children: [
                {
                    id: 'createInvoice',
                    title: 'Add Invoice',
                    type: 'item',
                    url: '/addInvoice',
                    breadcrumbs: false
                },
                {
                    id: 'viewInvoices',
                    title: 'Manage Invoices',
                    type: 'item',
                    url: '/invoices',
                    breadcrumbs: false
                }
            ]
        },

        {
            id: 'Factoring',
            title: 'Factoring',
            type: 'item',
            url: '/factoring',
            icon: icons.AttachMoneyOutlinedIcon
        }
    ]
};

export default section1;
