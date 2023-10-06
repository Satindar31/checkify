"use client"

import { ExternalToast, toast } from "sonner"

export default function DoToast(title: string, props: ExternalToast | undefined) {
    return toast(title, props)
}