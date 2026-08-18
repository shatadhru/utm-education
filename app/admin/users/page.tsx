"use client"
import React from 'react'


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';



import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from '@/lib/auth-client';




// 
import { useState } from "react";
import CreateUser from './components/CreateUser';
import ListUsers from './components/ListUsers';




















function page() {
  return (
    <div className="w-full"> 
      <div className="p-2">
        <h1 className="text-xl lg:text-2xl"> User Management </h1>
        <p className="text-xs lg:text-sm ">Manage Your User from here </p>
        </div>
        <div>


<div className="mt-4 w-full">
    
<CreateUser />
<ListUsers />
     
      </div>
            
        </div>
    </div>
  )
}

export default page
