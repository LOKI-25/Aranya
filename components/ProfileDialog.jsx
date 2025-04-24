"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ProfileCard } from "@/components/ProfileCard"
/**
 * ProfileDialog component
 * Modal dialog that displays the user profile card
 */
export function ProfileDialog({ open, onOpenChange, user }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
        <ProfileCard onClose={() => onOpenChange(false)} user={user} />
      </DialogContent>
    </Dialog>
  )
}
