import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import emailjs from '@emailjs/browser'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    friendName: '',
    friendEmail: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          friend_name: formData.friendName,
          friend_email: formData.friendEmail,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setSubmitStatus('success')
      setFormData({ name: '', email: '', friendName: '', friendEmail: '' })
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto py-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <img src="/logo.png" alt="listentothis,bro logo" width={100} height={100} className="w-[100px] h-[100px]" />
          <h1 className="text-4xl font-bold">listentothis,bro</h1>
        </div>
        <p className="text-xl text-center text-muted-foreground">
          Instantly share Spotify songs to custom playlists <br /> on your friends' accounts directly from your Chrome browser.
        </p>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div>
              <p className="text-lg leading-relaxed space-y-4">
                <span className="block font-bold text-2xl mb-4">Share Music, Skip the Chat</span>

                <span className="block mb-4">
                  Tired of cluttering your chats with Spotify links? <strong>listentothis,bro</strong> revolutionizes how you share music with friends. This sleek Chrome extension turns song recommendations into a seamless experience:
                </span>


               <br/>
              </p>
            </div>
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <div className="space-y-4">
              <p>1. Install our Chrome extension <a href="https://chromewebstore.google.com/detail/listentothisbro/ijmjmpinhlkcddmoibheifpkclcccook" className='text-blue-500 underline' target="_blank" rel="noopener noreferrer">here</a></p>
              <p>2. Connect your Spotify account</p>
              <p>3. Copy any Spotify song link</p>
              <p>4. Click the extension icon</p>
              <p>5. Choose a friend from your Spotify follower list, who also has the extension installed</p>
              <span className="block font-semibold mb-4">
                  Boom! The song lands in a personalized "Recommended by You" playlist on their Spotify
                </span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Get Access</CardTitle>
              <CardDescription>
                While we wait for Spotify to approve our extended quota, get access by entering your details below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Your Spotify Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <CardDescription> <br></br>You can only share songs with friends who have access, so it's better if your friend has access too!</CardDescription>

                <div className="space-y-2">
                  <Label htmlFor="friendName">Friend's Name (Optional)</Label>
                  <Input
                    id="friendName"
                    name="friendName"
                    value={formData.friendName}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="friendEmail">Friend's Spotify Email (Optional)</Label>
                  <Input
                    id="friendEmail"
                    name="friendEmail"
                    type="email"
                    value={formData.friendEmail}
                    onChange={handleChange}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Sign Up'}
                </Button>

                {submitStatus === 'success' && (
                  <p className="text-green-600 text-sm text-center mt-2">
                    Thank you for signing up! We'll be in touch soon.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-600 text-sm text-center mt-2">
                    Something went wrong. Please try again later.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Screenshots</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-4">
                <img
                  src="/screenshot-1.png"
                  alt="Extension Interface"
                  className="w-full rounded-lg"
                />
                <p className="mt-2 text-center text-muted-foreground">
                  Share music directly from Chrome
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <img
                  src="/screenshot-2.png"
                  alt="Notification Interface"
                  className="w-full rounded-lg"
                />
                <p className="mt-2 text-center text-muted-foreground">
                  Send music to a custom playlist on your friend's Spotify
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App 