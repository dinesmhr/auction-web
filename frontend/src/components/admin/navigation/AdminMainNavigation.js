import React from 'react';
import { AiOutlineDashboard, AiOutlineShopping } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { GoTasklist } from "react-icons/go";

const AdminMainNavigation = () => {
    return ( 
        <>
            <div id="admin-header" className="h-12 w-full text-white fixed">
                <h1 className="aweb-admin-site-title text-2xl font-normal tracking-wide pt-2 pl-10">Auction<span className="text-base italic">Web</span></h1>
            </div>
            <div id="admin-left-sidebar" className="aweb-admin-wrap text-white float-left w-1/5 h-screen fixed mt-12">
                <nav id="aweb-admin-navigation" className="pt-4">
                    <ul className="admin-nav-wrap m-0 p-0 space-y-4">
                        <li className="text-left"><a href="/aweb-admin" className="inline-flex text-lg py-3 px-7"><AiOutlineDashboard className="text-xl mt-0.5"/><span className="pl-2.5">Dashboard</span></a></li>
                        <li className="text-left"><a href="/aweb-users" className="inline-flex text-lg py-3 px-7"><FiUsers className="text-xl mt-0.5"/><span className="pl-2.5">Users</span></a></li>
                        <li className="text-left"><a href="/aweb-products" className="inline-flex text-lg py-3 px-7"><AiOutlineShopping className="text-xl mt-0.5"/><span className="pl-2.5">Products</span></a></li>
                        <li className="text-left"><a href="/aweb-categories" className="inline-flex text-lg py-3 px-7"><GoTasklist className="text-xl mt-0.5"/><span className="pl-2.5">Products Categories</span></a></li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default AdminMainNavigation;