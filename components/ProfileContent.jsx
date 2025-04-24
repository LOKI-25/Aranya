"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Typography } from "@/components/ui/Typography"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Edit2, Save, X } from "lucide-react"
// Mock user data (replace with actual data fetching in a real application)
const initialUserData = {
  username: "mindful_user",
  email: "user@example.com",
  password: "••••••••",
}
export function ProfileContent() {
  const [userData, setUserData] = useState(initialUserData)
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState(initialUserData)
  const handleEdit = () => {
    setIsEditing(true)
    setEditedData(userData)
  }
  const handleSave = () => {
    setUserData(editedData)
    setIsEditing(false)
    // In a real application, you would send this data to your backend here
  }
  const handleCancel = () => {
    setIsEditing(false)
    setEditedData(userData)
  }
  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value })
  }
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Typography variant="h1" className="mb-6">
        Your Profile
      </Typography>
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h2">Profile Information</Typography>
          {!isEditing ? (
            <Button onClick={handleEdit} variant="outline" size="sm">
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="space-x-2">
              <Button onClick={handleSave} variant="default" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={isEditing ? editedData.username : userData.username}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={isEditing ? editedData.email : userData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={isEditing ? editedData.password : userData.password}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
