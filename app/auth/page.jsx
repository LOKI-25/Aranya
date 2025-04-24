"use client"

import dynamic from "next/dynamic"
const DynamicAuthPage = dynamic(() => import("@/components/DynamicAuthPage"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})
export default function AuthPage() {
  return <DynamicAuthPage />
}
