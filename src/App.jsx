import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import {
  ArrowRight,
  Bell,
  BookOpen,
  Briefcase,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDashed,
  Clock3,
  Heart,
  ImageIcon,
  MessageSquareText,
  Moon,
  NotebookPen,
  Search,
  Sparkles,
  Star,
  Sun,
  Users,
  Wifi,
  X,
  Zap,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const storageKeys = {
  theme: 'skillcircle-theme',
  matches: 'skillcircle-matches',
  likes: 'skillcircle-likes',
  passes: 'skillcircle-passes',
  requests: 'skillcircle-requests',
  notifications: 'skillcircle-notifications',
  chats: 'skillcircle-chats',
  sessions: 'skillcircle-sessions',
}

const currentUser = {
  id: 'srishti',
  name: 'Srishti',
  course: 'Product Design',
  year: '3rd Year',
  bio: 'I love turning ideas into delightful experiences and building better learning communities.',
  image:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
  canTeach: ['UI/UX Design', 'Brand Storytelling'],
  wantsToLearn: ['Python Programming', 'Video Editing'],
  availability: ['Weekends', 'Evenings'],
  format: 'Either',
  interests: ['Design', 'Learning', 'Community'],
  rating: 4.9,
  exchanges: 18,
  completed: 14,
}

const skillCatalog = [
  {
    id: 'guitar',
    title: 'Guitar Playing',
    category: 'Music',
    teacher: 'Rhea Kapoor',
    teacherAvatar:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=80',
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    sessions: 128,
    level: 'Beginner friendly',
    description: 'Learn chords, rhythm and stage confidence through relaxed jam sessions.',
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    category: 'Technology',
    teacher: 'Aarav Mehta',
    teacherAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80',
    rating: 4.8,
    sessions: 214,
    level: 'Intermediate',
    description: 'Build responsive interfaces with modern JavaScript, HTML and CSS.',
  },
  {
    id: 'spanish',
    title: 'Spanish Language',
    category: 'Languages',
    teacher: 'Sofia Alvarez',
    teacherAvatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    sessions: 96,
    level: 'Beginner friendly',
    description: 'Practice speaking, listening and everyday conversations with confidence.',
  },
  {
    id: 'design',
    title: 'Graphic Design',
    category: 'Design & Creativity',
    teacher: 'Mira Shah',
    teacherAvatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80',
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
    rating: 5.0,
    sessions: 201,
    level: 'Intermediate',
    description: 'Design posters, flyers and visual stories using color, layout and typography.',
  },
  {
    id: 'photography',
    title: 'Photography',
    category: 'Photography & Media',
    teacher: 'Kabir Singh',
    teacherAvatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80',
    image:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80',
    rating: 4.7,
    sessions: 84,
    level: 'Beginner friendly',
    description: 'Frame better shots, play with light and sharpen your visual eye.',
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    category: 'Photography & Media',
    teacher: 'Anika Bose',
    teacherAvatar:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80',
    image:
      'https://images.unsplash.com/photo-1496703998952-04d1c4ebe10b?auto=format&fit=crop&w=900&q=80',
    rating: 4.8,
    sessions: 142,
    level: 'Intermediate',
    description: 'Learn storytelling, pacing and transitions for social-first videos.',
  },
  {
    id: 'python',
    title: 'Python Programming',
    category: 'Technology',
    teacher: 'Aarav Mehta',
    teacherAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    image:
      'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    sessions: 187,
    level: 'Intermediate',
    description: 'Get comfortable with Python syntax, logic and mini projects.',
  },
  {
    id: 'public-speaking',
    title: 'Public Speaking',
    category: 'Communication',
    teacher: 'Nisha Khanna',
    teacherAvatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
    rating: 4.8,
    sessions: 63,
    level: 'Beginner friendly',
    description: 'Speak with confidence, structure talks and stay calm under pressure.',
  },
  {
    id: 'ux',
    title: 'UI/UX Design',
    category: 'Design & Creativity',
    teacher: 'Meher Jain',
    teacherAvatar:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=500&q=80',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    sessions: 176,
    level: 'Intermediate',
    description: 'Design intuitive experiences with wireframes, flows and accessibility in mind.',
  },
  {
    id: 'illustration',
    title: 'Digital Illustration',
    category: 'Design & Creativity',
    teacher: 'Aditi Sen',
    teacherAvatar:
      'https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=500&q=80',
    image:
      'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=900&q=80',
    rating: 4.7,
    sessions: 54,
    level: 'Beginner friendly',
    description: 'Create process-driven illustrations with color, texture and character design.',
  },
  {
    id: 'baking',
    title: 'Baking',
    category: 'Lifestyle',
    teacher: 'Ira Sharma',
    teacherAvatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80',
    image:
      'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    sessions: 75,
    level: 'Beginner friendly',
    description: 'Bake cookies, cakes and breads with better technique and consistency.',
  },
  {
    id: 'excel',
    title: 'Excel & Data Analysis',
    category: 'Academics',
    teacher: 'Vikram Rao',
    teacherAvatar:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=500&q=80',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    rating: 4.8,
    sessions: 118,
    level: 'Intermediate',
    description: 'Use spreadsheets for analysis, charts and smarter decision-making.',
  },
]

const students = [
  {
    id: 'aarav',
    name: 'Aarav Mehta',
    course: 'Computer Science',
    year: '2nd Year',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80',
    bio: 'I enjoy building things with Python and exploring machine learning while curating design habits.',
    canTeach: ['Python Programming', 'Data Analysis'],
    wantsToLearn: ['UI/UX Design', 'Photography'],
    availability: ['Weekends', 'Online'],
    format: 'Either',
    interests: ['AI', 'Design', 'Travel'],
    rating: 4.9,
    level: 'Intermediate',
    matches: 11,
  },
  {
    id: 'mira',
    name: 'Mira Shah',
    course: 'Communication Design',
    year: '3rd Year',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80',
    bio: 'I sketch ideas, build visual stories and love helping others think creatively.',
    canTeach: ['Graphic Design', 'Illustration'],
    wantsToLearn: ['Python Programming', 'Public Speaking'],
    availability: ['Evenings', 'Weekends'],
    format: 'In-person',
    interests: ['Art', 'Storytelling', 'Community'],
    rating: 4.8,
    level: 'Advanced',
    matches: 9,
  },
  {
    id: 'sofia',
    name: 'Sofia Alvarez',
    course: 'Spanish & Literature',
    year: '1st Year',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80',
    bio: 'I am all about language, culture and connecting with people through conversation.',
    canTeach: ['Spanish Language', 'Public Speaking'],
    wantsToLearn: ['Photography', 'Video Editing'],
    availability: ['Weekends', 'Evenings'],
    format: 'Online',
    interests: ['Culture', 'Travel', 'Film'],
    rating: 4.9,
    level: 'Advanced',
    matches: 7,
  },
  {
    id: 'kabir',
    name: 'Kabir Singh',
    course: 'Media Studies',
    year: '2nd Year',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80',
    bio: 'I love capturing moments and turning stories into engaging visuals.',
    canTeach: ['Photography', 'Video Editing'],
    wantsToLearn: ['UI/UX Design', 'Brand Storytelling'],
    availability: ['Weekdays', 'Evenings'],
    format: 'Either',
    interests: ['Film', 'Travel', 'Music'],
    rating: 4.7,
    level: 'Intermediate',
    matches: 13,
  },
  {
    id: 'nisha',
    name: 'Nisha Khanna',
    course: 'Psychology',
    year: '3rd Year',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=700&q=80',
    bio: 'I love helping people express themselves clearly and confidently.',
    canTeach: ['Public Speaking', 'Presentation Skills'],
    wantsToLearn: ['Graphic Design', 'Data Analysis'],
    availability: ['Weekends', 'Online'],
    format: 'Online',
    interests: ['Workshops', 'Books', 'People'],
    rating: 4.8,
    level: 'Intermediate',
    matches: 12,
  },
]

const chartData = [
  { name: 'Mon', exchanges: 18, growth: 28 },
  { name: 'Tue', exchanges: 22, growth: 32 },
  { name: 'Wed', exchanges: 19, growth: 30 },
  { name: 'Thu', exchanges: 29, growth: 40 },
  { name: 'Fri', exchanges: 34, growth: 44 },
  { name: 'Sat', exchanges: 38, growth: 52 },
  { name: 'Sun', exchanges: 42, growth: 60 },
]

const testimonials = [
  {
    name: 'Riya Malhotra',
    course: 'Business Analytics',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    quote: 'I found a Python mentor and a design partner in the same week. It felt like a community built for real growth.',
    rating: 5,
  },
  {
    name: 'Dev Mehra',
    course: 'Mechanical Engineering',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    quote: 'SkillCircle made it easy to share what I know and learn things I never thought I could try.',
    rating: 5,
  },
  {
    name: 'Ananya Sethi',
    course: 'Interaction Design',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    quote: 'The match logic is thoughtful and the exchanges actually feel mutual, supportive and well paced.',
    rating: 5,
  },
]

const defaultRequests = [
  {
    id: 'req-1',
    student: 'Aarav Mehta',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    skillOffered: 'Python Programming',
    skillRequested: 'UI/UX Design',
    status: 'Pending',
    date: 'Today',
    incoming: true,
  },
  {
    id: 'req-2',
    student: 'Mira Shah',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    skillOffered: 'Graphic Design',
    skillRequested: 'Python Programming',
    status: 'Accepted',
    date: 'Last week',
    incoming: false,
  },
]

const defaultNotifications = [
  { id: 'n1', title: 'New mutual match', text: 'You matched with Aarav for Python and UI/UX', read: false, time: '2m ago' },
  { id: 'n2', title: 'Upcoming session', text: 'Design critique with Mira is scheduled for Saturday', read: true, time: '1h ago' },
  { id: 'n3', title: 'Exchange request', text: 'Nisha wants to trade public speaking for design feedback', read: false, time: '3h ago' },
]

const defaultChats = [
  {
    id: 'chat-aarav',
    studentId: 'aarav',
    studentName: 'Aarav Mehta',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    lastSeen: 'Online now',
    messages: [
      { id: 'm1', from: 'them', text: 'Hey! I can help you with Python practice this weekend.', time: '9:30 AM' },
      { id: 'm2', from: 'me', text: 'Perfect. I can share UI/UX notes in return.', time: '9:35 AM' },
    ],
  },
]

const defaultSessions = [
  { id: 's1', title: 'Python sprint with Aarav', date: 'Sat, 10:00 AM', mode: 'Online', note: 'We will review loops and mini scripts.' },
  { id: 's2', title: 'Design feedback round', date: 'Sun, 4:30 PM', mode: 'In-person', note: 'Bring 2 mockups to review.' },
]

const filterOptions = ['All', 'Technology', 'Design & Creativity', 'Music', 'Languages', 'Academics', 'Photography & Media', 'Lifestyle', 'Communication', 'Sports & Fitness']

function readStoredJson(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch (error) {
    return fallback
  }
}

function themeFromPreference(value) {
  if (value === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return value
}

function getCompatibility(studentA, studentB) {
  const aTeach = studentA.canTeach || []
  const aLearn = studentA.wantsToLearn || []
  const bTeach = studentB.canTeach || []
  const bLearn = studentB.wantsToLearn || []

  let score = 0
  aTeach.forEach((skill) => {
    if (bLearn.includes(skill)) score += 26
  })
  aLearn.forEach((skill) => {
    if (bTeach.includes(skill)) score += 24
  })
  studentA.interests?.forEach((interest) => {
    if (studentB.interests?.includes(interest)) score += 8
  })

  if (studentA.format === studentB.format || studentA.format === 'Either' || studentB.format === 'Either') {
    score += 10
  }

  const availabilityOverlap = (studentA.availability || []).filter((slot) => (studentB.availability || []).includes(slot))
  if (availabilityOverlap.length > 0) score += 12

  return Math.min(98, Math.max(72, Math.round(score)))
}

function App() {
  const [themeMode, setThemeMode] = useState(() => readStoredJson(storageKeys.theme, 'system'))
  const [matches, setMatches] = useState(() => readStoredJson(storageKeys.matches, [{ id: 'match-1', studentId: 'aarav', studentName: 'Aarav Mehta', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80', skillOffered: 'Python Programming', skillRequested: 'UI/UX Design', matchDate: 'Today', compatibility: 96, status: 'Open' }]))
  const [likes, setLikes] = useState(() => readStoredJson(storageKeys.likes, []))
  const [passes, setPasses] = useState(() => readStoredJson(storageKeys.passes, []))
  const [requests, setRequests] = useState(() => readStoredJson(storageKeys.requests, defaultRequests))
  const [notifications, setNotifications] = useState(() => readStoredJson(storageKeys.notifications, defaultNotifications))
  const [chats, setChats] = useState(() => readStoredJson(storageKeys.chats, defaultChats))
  const [sessions, setSessions] = useState(() => readStoredJson(storageKeys.sessions, defaultSessions))
  const [discoveryQueue, setDiscoveryQueue] = useState(() => students.filter((student) => student.id !== currentUser.id))
  const [swipeStack, setSwipeStack] = useState([])
  const [activeTab, setActiveTab] = useState('Overview')
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(storageKeys.matches, JSON.stringify(matches))
  }, [matches])

  useEffect(() => {
    localStorage.setItem(storageKeys.likes, JSON.stringify(likes))
  }, [likes])

  useEffect(() => {
    localStorage.setItem(storageKeys.passes, JSON.stringify(passes))
  }, [passes])

  useEffect(() => {
    localStorage.setItem(storageKeys.requests, JSON.stringify(requests))
  }, [requests])

  useEffect(() => {
    localStorage.setItem(storageKeys.notifications, JSON.stringify(notifications))
  }, [notifications])

  useEffect(() => {
    localStorage.setItem(storageKeys.chats, JSON.stringify(chats))
  }, [chats])

  useEffect(() => {
    localStorage.setItem(storageKeys.sessions, JSON.stringify(sessions))
  }, [sessions])

  useEffect(() => {
    localStorage.setItem(storageKeys.theme, JSON.stringify(themeMode))
    const resolvedTheme = themeFromPreference(themeMode)
    document.documentElement.setAttribute('data-theme', resolvedTheme)
  }, [themeMode])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (themeMode === 'system') {
        document.documentElement.setAttribute('data-theme', themeFromPreference('system'))
      }
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [themeMode])

  const stats = useMemo(
    () => [
      { label: 'Active Exchanges', value: '24', icon: Users },
      { label: 'Skills Learned', value: '16', icon: BookOpen },
      { label: 'Skills Taught', value: '11', icon: Sparkles },
      { label: 'Sessions Completed', value: '42', icon: CalendarDays },
    ],
    [],
  )

  const popularSkills = skillCatalog.slice(0, 8)
  const currentCard = discoveryQueue[0] || null

  const handleThemeChange = (value) => setThemeMode(value)

  const markNotificationsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })))
  }

  const addMessageToChat = (studentId, messageText) => {
    if (!messageText.trim()) return
    setChats((prev) =>
      prev.map((chat) =>
        chat.studentId === studentId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { id: `m-${Date.now()}`, from: 'me', text: messageText.trim(), time: 'Now' },
              ],
            }
          : chat,
      ),
    )
  }

  const handlePass = () => {
    if (!currentCard) return
    setPasses((prev) => [...prev, currentCard.id])
    setSwipeStack((prev) => [...prev, { student: currentCard, action: 'pass' }])
    setDiscoveryQueue((prev) => prev.filter((student) => student.id !== currentCard.id))
  }

  const handleLike = () => {
    if (!currentCard) return
    const existingLike = likes.some((like) => like.userId === currentUser.id && like.targetId === currentCard.id)
    if (!existingLike) {
      const newLike = { userId: currentUser.id, targetId: currentCard.id }
      setLikes((prev) => [...prev, newLike])
    }

    const matchExists = matches.some(
      (match) =>
        (match.studentId === currentCard.id && match.userId === currentUser.id) ||
        (match.studentId === currentUser.id && match.userId === currentCard.id),
    )

    if (!matchExists && likes.some((like) => like.userId === currentCard.id && like.targetId === currentUser.id)) {
      const newMatch = {
        id: `match-${Date.now()}`,
        userId: currentUser.id,
        studentId: currentCard.id,
        studentName: currentCard.name,
        avatar: currentCard.image,
        skillOffered: currentUser.canTeach[0],
        skillRequested: currentCard.wantsToLearn[0] || currentCard.canTeach[0],
        matchDate: 'Today',
        compatibility: getCompatibility(currentUser, currentCard),
        status: 'Open',
      }
      setMatches((prev) => [newMatch, ...prev])
      setNotifications((prev) => [
        {
          id: `n-${Date.now()}`,
          title: 'New mutual match',
          text: `You matched with ${currentCard.name} for ${newMatch.skillOffered} and ${newMatch.skillRequested}`,
          read: false,
          time: 'Just now',
        },
        ...prev,
      ])
    }

    setSwipeStack((prev) => [...prev, { student: currentCard, action: 'like' }])
    setDiscoveryQueue((prev) => prev.filter((student) => student.id !== currentCard.id))
  }

  const handleSuperLike = () => {
    if (!currentCard) return
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: 'Super interested',
        text: `You marked ${currentCard.name} as super interested. They will see your strong interest.`,
        read: false,
        time: 'Just now',
      },
      ...prev,
    ])
    handleLike()
  }

  const undoSwipe = () => {
    if (!swipeStack.length) return
    const last = swipeStack[swipeStack.length - 1]
    setDiscoveryQueue((prev) => [last.student, ...prev])
    setSwipeStack((prev) => prev.slice(0, -1))

    if (last.action === 'like') {
      setLikes((prev) => prev.filter((like) => !(like.userId === currentUser.id && like.targetId === last.student.id)))
    }
    if (last.action === 'pass') {
      setPasses((prev) => prev.filter((id) => id !== last.student.id))
    }
  }

  const refreshDiscovery = () => {
    setDiscoveryQueue(students.filter((student) => student.id !== currentUser.id && !passes.includes(student.id)))
    setSwipeStack([])
  }

  const requestedSkill = currentCard ? currentCard.wantsToLearn[0] : 'Graphic Design'

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)]">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color:var(--surface)]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-extrabold text-white shadow-soft">
                S
              </div>
              <div>
                <div className="text-lg font-extrabold tracking-tight text-[var(--navy)] dark:text-white">SkillCircle</div>
              </div>
            </div>

            <div className="hidden items-center gap-8 text-sm font-medium lg:flex">
              {[
                ['Home', '/'],
                ['Explore Skills', '/explore'],
                ['Find Your Circle', '/circle'],
                ['Matches', '/matches'],
                ['How It Works', '/how-it-works'],
                ['Community', '/community'],
              ].map(([label, path]) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `transition hover:text-[var(--primary)] ${isActive ? 'text-[var(--primary)]' : 'text-[var(--navy)] dark:text-[var(--text-primary)]'}`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-2 shadow-sm">
                {themeMode === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                <select
                  value={themeMode}
                  onChange={(event) => handleThemeChange(event.target.value)}
                  className="theme-select"
                  aria-label="Theme preference"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <button type="button" className="icon-button" onClick={() => { setNotificationPanelOpen((prev) => !prev); markNotificationsRead(); }}>
                <Bell size={18} />
                {notifications.some((item) => !item.read) && <span className="notification-dot" />}
              </button>
              <Link to="/dashboard" className="hidden items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 shadow-sm sm:flex">
                <img src={currentUser.image} alt={currentUser.name} className="h-8 w-8 rounded-full object-cover" />
                <span className="text-sm font-semibold text-[var(--navy)]">Srishti</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        {notificationPanelOpen && (
          <div className="mb-6 rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[var(--navy)]">Notifications</h3>
              <button type="button" onClick={() => setNotificationPanelOpen(false)} className="text-sm font-semibold text-[var(--primary)]">Close</button>
            </div>
            <div className="space-y-3">
              {notifications.map((item) => (
                <div key={item.id} className={`rounded-2xl border p-3 ${item.read ? 'border-[var(--border)] bg-[var(--bg-main)]' : 'border-[var(--primary)] bg-[var(--soft-peach)]'}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-[var(--navy)]">{item.title}</div>
                    {!item.read && <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />}
                  </div>
                  <div className="mt-1 text-sm text-[var(--secondary)]">{item.text}</div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.12em] text-[var(--secondary)]">{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                popularSkills={popularSkills}
                currentUser={currentUser}
                stats={stats}
                testimonials={testimonials}
                recommendedMatches={students.slice(0, 3)}
              />
            }
          />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/circle" element={<CirclePage currentUser={currentUser} discoveryQueue={discoveryQueue} handlePass={handlePass} handleLike={handleLike} handleSuperLike={handleSuperLike} undoSwipe={undoSwipe} refreshDiscovery={refreshDiscovery} matches={matches} currentCard={currentCard} />} />
          <Route path="/matches" element={<MatchesPage matches={matches} />} />
          <Route path="/messages" element={<MessagesPage chats={chats} addMessageToChat={addMessageToChat} />} />
          <Route path="/dashboard" element={<DashboardPage activeTab={activeTab} setActiveTab={setActiveTab} requests={requests} setRequests={setRequests} notifications={notifications} setNotifications={setNotifications} matches={matches} sessions={sessions} setSessions={setSessions} />} />
          <Route path="/profile/:studentId" element={<ProfilePage requests={requests} setRequests={setRequests} notifications={notifications} setNotifications={setNotifications} />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
        </Routes>
      </main>

      <footer className="mt-16 border-t border-[var(--border)] bg-[var(--footer-bg)] text-[var(--footer-text)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-bold text-white">S</div>
              <div>
                <div className="text-lg font-extrabold">SkillCircle</div>
              </div>
            </div>
            <p className="max-w-xs text-sm text-[var(--footer-muted)]">Share what you know. Learn what you love.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--footer-muted)]">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--footer-muted)]">
              <li><Link to="/explore">Explore Skills</Link></li>
              <li><Link to="/circle">Find Your Circle</Link></li>
              <li><Link to="/community">Community</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--footer-muted)]">Company</h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--footer-muted)]">
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><a href="#">About</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--footer-muted)]">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--footer-muted)]">
              <li>hello@skillcircle.app</li>
              <li>+91 98765 43210</li>
              <li>Campus Hub, Bengaluru</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}

function HomePage({ popularSkills, currentUser, stats, testimonials, recommendedMatches }) {
  return (
    <div className="space-y-16">
      <section className="rounded-[32px] border border-[var(--border)] bg-[var(--hero-gradient)] p-4 shadow-soft sm:p-6 lg:p-8">
        <div className="grid items-center gap-10 rounded-[28px] bg-[var(--surface)] p-6 shadow-soft md:p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-[var(--accent-soft)] bg-[var(--soft-peach)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
              LEARN TOGETHER. GROW TOGETHER.
            </div>
            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-black leading-none tracking-[-0.05em] text-[var(--navy)] sm:text-5xl lg:text-6xl">
                Exchange Skills, <span className="text-[var(--primary)]">Empower Growth.</span>
              </h1>
              <p className="text-xl text-[var(--secondary)]">Share what you know. Learn what you love.</p>
              <p className="max-w-lg text-base text-[var(--secondary)]">
                Connect with students who share your interests, exchange knowledge and discover new skills. Grow together, one skill at a time.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/explore" className="rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-[var(--deep-orange)]">Discover Skills</Link>
              <Link to="/circle" className="rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--navy)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]">Find Your Circle</Link>
            </div>
            <div className="flex flex-wrap items-center gap-5 pt-4">
              {[
                { value: '2.4k+', label: 'Active Learners' },
                { value: '120+', label: 'Skills Shared' },
                { value: '890', label: 'Successful Exchanges' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--soft-lavender)] px-4 py-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((index) => (
                      <img
                        key={index}
                        src={`https://images.unsplash.com/photo-${index === 1 ? '1544005313-94ddf0286df2' : index === 2 ? '1500648767791-00dcc994a43e' : '1524504388940-b1c1722653e1'}?auto=format&fit=crop&w=120&q=80`}
                        alt="" 
                        className="h-8 w-8 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="text-lg font-extrabold text-[var(--navy)]">{stat.value}</div>
                    <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--secondary)]">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle,_rgba(245,158,11,0.15),_transparent_60%)]" />
            <div className="relative w-full max-w-xl overflow-hidden rounded-[30px] border border-[var(--border)] bg-[linear-gradient(145deg,#fffdf9,#f3edff)] p-5 shadow-soft">
              <div className="rounded-[24px] bg-[var(--soft-peach)] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-[var(--primary)] p-2 text-white">
                      <BookOpen size={20} strokeWidth={2.2} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[var(--navy)]">Campus Circle</div>
                      <div className="text-xs text-[var(--secondary)]">Students helping students</div>
                    </div>
                  </div>
                  <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--primary)]">Live</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.16em] text-[var(--secondary)]">Allies</span>
                      <Heart className="text-[var(--primary)]" size={16} />
                    </div>
                    <div className="flex -space-x-2">
                      {['https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80'].map((src, index) => (
                        <img key={src} src={src} alt="participant" className="h-10 w-10 rounded-full border-2 border-white object-cover" style={{ zIndex: 3 - index }} />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[var(--navy)] p-4 text-white shadow-sm">
                    <div className="text-xs uppercase tracking-[0.16em] text-white/70">New match</div>
                    <div className="mt-3 text-3xl font-black">96%</div>
                    <div className="mt-2 text-xs text-white/80">Design + Python synergy</div>
                  </div>
                  <div className="col-span-2 rounded-2xl bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-sm font-semibold text-[var(--navy)]">Skill swap board</div>
                      <div className="rounded-full bg-[var(--soft-lavender)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--navy)]">Top match</div>
                    </div>
                    <div className="space-y-3">
                      {['Python', 'Graphic Design', 'Photography'].map((skill, index) => (
                        <div key={skill} className="flex items-center gap-3 text-sm text-[var(--secondary)]">
                          <div className="h-2.5 w-2.5 rounded-full" style={{ background: ['#F59E0B', '#8B78F6', '#68B58B'][index] }} />
                          <span className="flex-1">{skill}</span>
                          <span className="font-semibold text-[var(--navy)]">{index === 0 ? '8 students' : index === 1 ? '6 tutors' : '5 mentors'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--navy)]">Popular <span className="text-[var(--primary)]">Skills</span></h2>
            <p className="mt-2 max-w-2xl text-base text-[var(--secondary)]">Discover what&apos;s trending in your community and find your next learning adventure.</p>
          </div>
          <Link to="/explore" className="hidden rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--navy)] transition hover:border-[var(--primary)] hover:text-[var(--primary)] sm:inline-flex">
            View All Skills
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {popularSkills.map((skill) => (
            <article key={skill.id} className="group overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-glow">
              <div className="overflow-hidden">
                <img src={skill.image} alt={skill.title} className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img src={skill.teacherAvatar} alt={skill.teacher} className="h-9 w-9 rounded-full object-cover" />
                    <div>
                      <div className="text-sm font-semibold text-[var(--navy)]">{skill.teacher}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-[var(--soft-peach)] px-2 py-1 text-xs font-semibold text-[var(--navy)]">
                    <Star size={12} fill="currentColor" /> {skill.rating}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-[var(--secondary)]">
                  <span>{skill.category}</span>
                  <span>{skill.sessions} sessions</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--navy)]">{skill.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--secondary)]">{skill.description}</p>
                </div>
                <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--soft-lavender)] px-4 py-3 text-sm font-semibold text-[var(--navy)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]">
                  View Skill <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-soft">
            <div className="mb-4 inline-flex rounded-2xl bg-[var(--soft-lavender)] p-3 text-[var(--primary)]">
              <Icon size={20} />
            </div>
            <div className="text-3xl font-black tracking-[-0.05em] text-[var(--navy)]">{value}</div>
            <div className="mt-2 text-sm text-[var(--secondary)]">{label}</div>
          </div>
        ))}
      </section>

      <section className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-soft sm:p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--navy)]">Find Your <span className="text-[var(--primary)]">Skill Match</span></h2>
          <Link to="/circle" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-main)] px-4 py-2 text-sm font-semibold text-[var(--navy)]">Browse all matches</Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {recommendedMatches.map((match) => (
            <div key={match.id} className="rounded-[24px] border border-[var(--border)] bg-[var(--soft-lavender)] p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={match.image} alt={match.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-[var(--navy)]">{match.name}</div>
                    <div className="text-sm text-[var(--secondary)]">{match.course}</div>
                  </div>
                </div>
                <div className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-[var(--primary)]">{getCompatibility(currentUser, match)}%</div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-[var(--navy)]">Teach: {match.canTeach[0]}</span>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-[var(--navy)]">Learn: {match.wantsToLearn[0]}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--secondary)]">They match your learning goals and availability, making it easy to build a reciprocal exchange.</p>
              <Link to={`/profile/${match.id}`} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white">View profile</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-soft sm:p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--navy)]">Real Stories from <span className="text-[var(--primary)]">Our Community</span></h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((story) => (
            <div key={story.name} className="rounded-[24px] border border-[var(--border)] bg-[var(--soft-peach)] p-5">
              <div className="mb-4 flex items-center gap-3">
                <img src={story.avatar} alt={story.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-[var(--navy)]">{story.name}</div>
                  <div className="text-sm text-[var(--secondary)]">{story.course}</div>
                </div>
              </div>
              <div className="mb-3 flex gap-1 text-[var(--primary)]">
                {Array.from({ length: story.rating }).map((_, idx) => (<Star key={idx} size={14} fill="currentColor" />))}
              </div>
              <p className="text-sm leading-7 text-[var(--secondary)]">“{story.quote}”</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Popularity')
  const [query, setQuery] = useState('')

  const visibleSkills = useMemo(() => {
    const filtered = skillCatalog.filter((skill) => {
      const matchesText =
        skill.title.toLowerCase().includes(query.toLowerCase()) ||
        skill.teacher.toLowerCase().includes(query.toLowerCase()) ||
        skill.category.toLowerCase().includes(query.toLowerCase()) ||
        skill.description.toLowerCase().includes(query.toLowerCase())
      const matchesFilter = activeFilter === 'All' || skill.category === activeFilter
      return matchesText && matchesFilter
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'Highest rated') return b.rating - a.rating
      if (sortBy === 'Recently added') return b.sessions - a.sessions
      if (sortBy === 'Beginner friendly') return Number(a.level.includes('Beginner')) - Number(b.level.includes('Beginner'))
      return b.sessions - a.sessions
    })
  }, [activeFilter, query, sortBy])

  return (
    <div className="space-y-8">
      <section className="rounded-[30px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--navy)]">Find something worth learning.</h1>
            <p className="mt-2 text-base text-[var(--secondary)]">Explore what your campus community has to offer.</p>
          </div>
          <div className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--secondary)]" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search skills, people or interests..."
              className="w-full rounded-full border border-[var(--border)] bg-[var(--bg-main)] py-3 pl-12 pr-4 text-sm text-[var(--navy)] outline-none ring-0 transition placeholder:text-[var(--secondary)] focus:border-[var(--primary)]"
            />
          </div>
        </div>
      </section>

      <section className="rounded-[30px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeFilter === filter ? 'bg-[var(--primary)] text-white' : 'border border-[var(--border)] bg-[var(--bg-main)] text-[var(--navy)]'}`}
              >
                {filter}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-full border border-[var(--border)] bg-[var(--bg-main)] px-4 py-2 text-sm text-[var(--navy)] outline-none focus:border-[var(--primary)]"
          >
            <option>Popularity</option>
            <option>Highest rated</option>
            <option>Recently added</option>
            <option>Beginner friendly</option>
          </select>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleSkills.map((skill) => (
          <article key={skill.id} className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface)] shadow-soft">
            <img src={skill.image} alt={skill.title} className="h-52 w-full object-cover" />
            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-[var(--secondary)]">{skill.category}</div>
                  <h3 className="mt-2 text-2xl font-bold text-[var(--navy)]">{skill.title}</h3>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-[var(--soft-peach)] px-2 py-1 text-xs font-semibold text-[var(--navy)]">
                  <Star fill="currentColor" size={12} /> {skill.rating}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img src={skill.teacherAvatar} alt={skill.teacher} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold text-[var(--navy)]">{skill.teacher}</div>
                  <div className="text-xs text-[var(--secondary)]">{skill.level}</div>
                </div>
              </div>
              <div className="rounded-2xl bg-[var(--soft-lavender)] p-3 text-sm text-[var(--secondary)]">
                <div className="font-semibold text-[var(--navy)]">Offer</div>
                <div className="mt-1">Can teach: <span className="font-medium text-[var(--primary)]">{skill.title}</span></div>
                <div className="mt-1">Wants to learn: <span className="font-medium text-[var(--navy)]">UI/UX Design</span></div>
                <div className="mt-2 flex items-center justify-between text-xs uppercase tracking-[0.12em] text-[var(--secondary)]">
                  <span>Availability</span>
                  <span>Weekends</span>
                </div>
              </div>
              <Link to="/profile/aarav" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--deep-orange)]">View Profile <ArrowRight size={16} /></Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

function CirclePage({ currentUser, discoveryQueue, handlePass, handleLike, handleSuperLike, undoSwipe, refreshDiscovery, currentCard }) {
  return (
    <div className="space-y-8">
      <section className="rounded-[30px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-soft sm:p-8">
        <div className="mb-8 max-w-2xl">
          <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--navy)]">Find Your Circle.</h1>
          <p className="mt-3 text-lg text-[var(--secondary)]">Discover people who can teach you something new — and learn something from you too.</p>
        </div>

        {currentCard ? (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative flex min-h-[540px] items-center justify-center overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--soft-peach)] p-4">
              <div className="absolute inset-x-6 top-6 flex justify-between text-xs font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">
                <span>Swipe right to connect</span>
                <span>{discoveryQueue.length} left</span>
              </div>
              <div className="card-stack">
                <div className="swipe-card relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-white shadow-soft">
                  <img src={currentCard.image} alt={currentCard.name} className="h-[400px] w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-3xl font-black tracking-[-0.04em]">{currentCard.name}</h2>
                        <p className="text-sm text-white/80">{currentCard.course}, {currentCard.year}</p>
                      </div>
                      <div className="rounded-full bg-white/15 px-3 py-1 text-xs border border-white/20">{getCompatibility(currentUser, currentCard)}% match</div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/85">{currentCard.bio}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-soft">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[var(--navy)]">Profile snapshot</h3>
                  <Link to={`/profile/${currentCard.id}`} className="text-sm font-semibold text-[var(--primary)]">Open profile</Link>
                </div>
                <div className="space-y-4 text-sm text-[var(--secondary)]">
                  <div>
                    <div className="mb-1 font-semibold text-[var(--navy)]">Can teach</div>
                    <div className="flex flex-wrap gap-2">
                      {currentCard.canTeach.map((skill) => (
                        <span key={skill} className="rounded-full bg-[var(--soft-lavender)] px-3 py-1 font-medium text-[var(--navy)]">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 font-semibold text-[var(--navy)]">Wants to learn</div>
                    <div className="flex flex-wrap gap-2">
                      {currentCard.wantsToLearn.map((skill) => (
                        <span key={skill} className="rounded-full bg-[var(--soft-peach)] px-3 py-1 font-medium text-[var(--navy)]">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-[var(--soft-lavender)] p-3">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--secondary)]">Experience</div>
                      <div className="mt-2 font-semibold text-[var(--navy)]">{currentCard.level}</div>
                    </div>
                    <div className="rounded-2xl bg-[var(--soft-peach)] p-3">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--secondary)]">Availability</div>
                      <div className="mt-2 font-semibold text-[var(--navy)]">{currentCard.availability.join(', ')}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-soft">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[var(--navy)]">Actions</h3>
                  <button type="button" onClick={undoSwipe} className="text-sm font-semibold text-[var(--primary)]">Undo last swipe</button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <button type="button" onClick={handlePass} className="rounded-full border border-[var(--border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--navy)] transition hover:border-red-300 hover:text-red-500">Pass</button>
                  <button type="button" onClick={handleLike} className="rounded-full bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--deep-orange)]">Like</button>
                  <button type="button" onClick={handleSuperLike} className="rounded-full bg-[var(--navy)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90">Super Interested</button>
                </div>
                <div className="mt-4 rounded-2xl bg-[var(--soft-lavender)] p-4 text-sm text-[var(--secondary)]">
                  <div className="font-semibold text-[var(--navy)]">Why this match works</div>
                  <p className="mt-2">You can teach {currentUser.canTeach[0]} while {currentCard.name} can teach {currentCard.canTeach[0]}. This creates a reciprocal exchange with strong learning potential.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-[30px] border border-dashed border-[var(--border)] bg-[var(--surface)] p-10 text-center shadow-soft">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--soft-peach)] text-[var(--primary)]">
              <Users size={28} />
            </div>
            <h3 className="text-2xl font-black text-[var(--navy)]">You&apos;ve discovered everyone for now.</h3>
            <p className="mt-3 text-base text-[var(--secondary)]">Check back later or adjust your preferences to uncover new skill partners.</p>
            <button type="button" onClick={refreshDiscovery} className="mt-6 rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white">Refresh discovery</button>
          </div>
        )}
      </section>
    </div>
  )
}

function DashboardPage({ activeTab, setActiveTab, requests, setRequests, notifications, setNotifications, matches, sessions, setSessions }) {
  const tabs = ['Overview', 'Incoming Requests', 'Sent Requests', 'Active Exchanges', 'Completed Exchanges']

  const handleStatusChange = (requestId, nextStatus) => {
    setRequests((prev) => prev.map((request) => (request.id === requestId ? { ...request, status: nextStatus } : request)))
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: nextStatus === 'Accepted' ? 'Request accepted' : 'Request declined',
        text: `The exchange request has been marked as ${nextStatus.toLowerCase()}.`,
        read: false,
        time: 'Just now',
      },
      ...prev,
    ])
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[30px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">Dashboard</p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.05em] text-[var(--navy)]">Good afternoon, Srishti!</h1>
            <p className="mt-2 text-base text-[var(--secondary)]">Your next learning adventure is waiting.</p>
          </div>
          <button type="button" className="rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white">Create exchange request</button>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Active Exchanges', value: 7 },
          { label: 'Skills Learned', value: 12 },
          { label: 'Skills Taught', value: 9 },
          { label: 'Sessions Completed', value: 26 },
        ].map((stat) => (
          <div key={stat.label} className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-soft">
            <div className="text-sm text-[var(--secondary)]">{stat.label}</div>
            <div className="mt-3 text-3xl font-black text-[var(--navy)]">{stat.value}</div>
          </div>
        ))}
      </section>

      <section className="rounded-[30px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-soft">
        <div className="mb-5 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeTab === tab ? 'bg-[var(--navy)] text-white' : 'bg-[var(--bg-main)] text-[var(--secondary)]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Overview' && (
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--bg-main)] p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-[var(--navy)]">Learning momentum</h3>
                <span className="text-sm text-[var(--secondary)]">This week</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="areaStroke" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="exchanges" stroke="#F59E0B" fill="url(#areaStroke)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--bg-main)] p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-[var(--navy)]">Activity summary</h3>
                <span className="text-sm text-[var(--secondary)]">This month</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="growth" fill="#8B78F6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {(activeTab === 'Incoming Requests' || activeTab === 'Sent Requests') && (
          <div className="space-y-4">
            {requests.filter((request) => request.incoming === (activeTab === 'Incoming Requests')).map((request) => (
              <div key={request.id} className="rounded-[24px] border border-[var(--border)] bg-[var(--bg-main)] p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <img src={request.avatar} alt={request.student} className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-[var(--navy)]">{request.student}</div>
                      <div className="text-sm text-[var(--secondary)]">{request.skillOffered} • {request.skillRequested}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-[var(--soft-lavender)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--navy)]">{request.status}</span>
                    <span className="text-sm text-[var(--secondary)]">{request.date}</span>
                  </div>
                </div>
                {(activeTab === 'Incoming Requests' && request.status === 'Pending') && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button type="button" onClick={() => handleStatusChange(request.id, 'Accepted')} className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white">Accept</button>
                    <button type="button" onClick={() => handleStatusChange(request.id, 'Declined')} className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--navy)]">Decline</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {(activeTab === 'Active Exchanges' || activeTab === 'Completed Exchanges') && (
          <div className="space-y-4">
            {matches.map((match) => (
              <div key={match.id} className="rounded-[24px] border border-[var(--border)] bg-[var(--bg-main)] p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <img src={match.avatar} alt={match.studentName} className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-[var(--navy)]">{match.studentName}</div>
                      <div className="text-sm text-[var(--secondary)]">{match.skillOffered} <ChevronRight size={14} className="inline" /> {match.skillRequested}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-[var(--soft-peach)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--navy)]">{match.status}</span>
                    <span className="text-sm text-[var(--secondary)]">{match.matchDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-[30px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-[var(--navy)]">Session scheduling</h3>
          <button type="button" onClick={() => setSessions((prev) => [...prev, { id: `s-${Date.now()}`, title: 'New skills session', date: 'Sun, 1:00 PM', mode: 'Online', note: 'Add a brief goal for the session.' }])} className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white">Schedule session</button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {sessions.map((session) => (
            <div key={session.id} className="rounded-[22px] border border-[var(--border)] bg-[var(--bg-main)] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold text-[var(--navy)]">{session.title}</div>
                <span className="rounded-full bg-[var(--soft-lavender)] px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--navy)]">{session.mode}</span>
              </div>
              <div className="mt-3 text-sm text-[var(--secondary)]">{session.date}</div>
              <p className="mt-2 text-sm leading-6 text-[var(--secondary)]">{session.note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function ProfilePage({ requests, setRequests, notifications, setNotifications }) {
  const { studentId } = useParams()
  const student = students.find((entry) => entry.id === studentId) || students[0]
  const [localRequest, setLocalRequest] = useState({
    wantedSkill: student.wantsToLearn[0] || 'UI/UX Design',
    offeredSkill: currentUser.canTeach[0] || 'Python Programming',
    format: 'Either',
    availability: 'Weekends',
    note: 'I would love to share and learn together.',
  })

  const handleRequestSubmit = () => {
    const request = {
      id: `req-${Date.now()}`,
      student: student.name,
      avatar: student.image,
      skillOffered: localRequest.offeredSkill,
      skillRequested: localRequest.wantedSkill,
      status: 'Pending',
      date: 'Just now',
      incoming: false,
    }
    setRequests((prev) => [request, ...prev])
    setNotifications((prev) => [{
      id: `n-${Date.now()}`,
      title: 'Exchange request sent',
      text: `Your exchange request for ${student.name} is pending.`,
      read: false,
      time: 'Just now',
    }, ...prev])
  }

  const skillReviewTags = ['Great teacher', 'Patient', 'Easy to understand', 'Helpful resources']

  return (
    <div className="space-y-8">
      <section className="rounded-[30px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-soft sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--soft-peach)] p-3">
            <img src={student.image} alt={student.name} className="h-[480px] w-full rounded-[22px] object-cover" />
          </div>
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]">{student.course}</div>
            </div>
            <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--navy)]">{student.name}</h1>
            <p className="mt-3 text-lg text-[var(--secondary)]">{student.bio}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" className="rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white">Like</button>
              <button type="button" onClick={handleRequestSubmit} className="rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--navy)]">Send Exchange Request</button>
              <Link to="/messages" className="rounded-full border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--navy)]">Message</Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] bg-[var(--soft-lavender)] p-4">
                <div className="text-xs uppercase tracking-[0.14em] text-[var(--secondary)]">Skills I can teach</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {student.canTeach.map((skill) => (<span key={skill} className="rounded-full bg-white px-3 py-1 text-sm font-medium text-[var(--navy)]">{skill}</span>))}
                </div>
              </div>
              <div className="rounded-[22px] bg-[var(--soft-peach)] p-4">
                <div className="text-xs uppercase tracking-[0.14em] text-[var(--secondary)]">Skills I want to learn</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {student.wantsToLearn.map((skill) => (<span key={skill} className="rounded-full bg-white px-3 py-1 text-sm font-medium text-[var(--navy)]">{skill}</span>))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[30px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-soft">
        <div className="mb-4">
          <h3 className="text-2xl font-black text-[var(--navy)]">Exchange request</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--navy)]">Skill you want to learn</span>
            <select value={localRequest.wantedSkill} onChange={(event) => setLocalRequest((prev) => ({ ...prev, wantedSkill: event.target.value }))} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-main)] p-3 text-[var(--navy)]">
              {student.wantsToLearn.map((skill) => <option key={skill} value={skill}>{skill}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--navy)]">Skill you can offer</span>
            <select value={localRequest.offeredSkill} onChange={(event) => setLocalRequest((prev) => ({ ...prev, offeredSkill: event.target.value }))} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-main)] p-3 text-[var(--navy)]">
              {currentUser.canTeach.map((skill) => <option key={skill} value={skill}>{skill}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--navy)]">Preferred format</span>
            <select value={localRequest.format} onChange={(event) => setLocalRequest((prev) => ({ ...prev, format: event.target.value }))} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-main)] p-3 text-[var(--navy)]">
              <option>In-person</option>
              <option>Online</option>
              <option>Either</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--navy)]">Availability</span>
            <select value={localRequest.availability} onChange={(event) => setLocalRequest((prev) => ({ ...prev, availability: event.target.value }))} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-main)] p-3 text-[var(--navy)]">
              <option>Weekends</option>
              <option>Evenings</option>
              <option>Weekdays</option>
              <option>Anytime</option>
            </select>
          </label>
        </div>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-semibold text-[var(--navy)]">Introduction</span>
          <textarea value={localRequest.note} onChange={(event) => setLocalRequest((prev) => ({ ...prev, note: event.target.value }))} className="min-h-[100px] w-full rounded-[22px] border border-[var(--border)] bg-[var(--bg-main)] p-3 text-[var(--navy)]" />
        </label>
        <div className="mt-5 flex flex-wrap gap-2">
          {skillReviewTags.map((tag) => (
            <span key={tag} className="rounded-full bg-[var(--soft-lavender)] px-3 py-1 text-xs font-medium text-[var(--navy)]">{tag}</span>
          ))}
        </div>
      </section>
    </div>
  )
}

function MatchesPage({ matches }) {
  return (
    <div className="space-y-6">
      <section className="rounded-[30px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-soft sm:p-8">
        <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--navy)]">Your matches</h1>
        <p className="mt-2 text-base text-[var(--secondary)]">Mutual matches, exchange compatibility and the next step in your learning journey.</p>
      </section>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {matches.map((match) => (
          <div key={match.id} className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <img src={match.avatar} alt={match.studentName} className="h-14 w-14 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-[var(--navy)]">{match.studentName}</div>
                <div className="text-sm text-[var(--secondary)]">{match.matchDate}</div>
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-[var(--soft-peach)] p-3 text-sm text-[var(--secondary)]">
              <div className="font-semibold text-[var(--navy)]">Skill exchange</div>
              <div className="mt-1">You teach: {match.skillOffered}</div>
              <div>They teach: {match.skillRequested}</div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="rounded-full bg-[var(--soft-lavender)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--navy)]">{match.compatibility}% match</span>
              <Link to="/messages" className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white">Open chat</Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

function MessagesPage({ chats, addMessageToChat }) {
  const [selectedChat, setSelectedChat] = useState(chats[0]?.studentId || '')
  const currentChat = chats.find((entry) => entry.studentId === selectedChat) || chats[0]
  const [draft, setDraft] = useState('')

  useEffect(() => {
    if (!selectedChat && chats[0]) {
      setSelectedChat(chats[0].studentId)
    }
  }, [chats, selectedChat])

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <aside className="rounded-[30px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-soft">
        <div className="mb-4 text-xl font-bold text-[var(--navy)]">Messages</div>
        <div className="space-y-3">
          {chats.map((chat) => (
            <button key={chat.id} type="button" onClick={() => setSelectedChat(chat.studentId)} className={`flex w-full items-center gap-3 rounded-[18px] border p-3 text-left ${selectedChat === chat.studentId ? 'border-[var(--primary)] bg-[var(--soft-peach)]' : 'border-[var(--border)] bg-[var(--bg-main)]'}`}>
              <img src={chat.avatar} alt={chat.studentName} className="h-12 w-12 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <div className="truncate font-semibold text-[var(--navy)]">{chat.studentName}</div>
                <div className="truncate text-xs text-[var(--secondary)]">{chat.messages[chat.messages.length - 1]?.text}</div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <section className="rounded-[30px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-soft">
        {currentChat ? (
          <>
            <div className="mb-4 flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div className="flex items-center gap-3">
                <img src={currentChat.avatar} alt={currentChat.studentName} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-[var(--navy)]">{currentChat.studentName}</div>
                  <div className="text-xs text-[var(--secondary)]">{currentChat.lastSeen}</div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {currentChat.messages.map((message) => (
                <div key={message.id} className={`flex ${message.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-[18px] px-4 py-3 text-sm ${message.from === 'me' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-main)] text-[var(--navy)]'}`}>
                    {message.text}
                    <div className={`mt-1 text-[10px] ${message.from === 'me' ? 'text-white/80' : 'text-[var(--secondary)]'}`}>{message.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Type a message" className="flex-1 rounded-full border border-[var(--border)] bg-[var(--bg-main)] px-4 py-3 text-sm text-[var(--navy)] outline-none focus:border-[var(--primary)]" />
              <button type="button" onClick={() => { addMessageToChat(currentChat.studentId, draft); setDraft(''); }} className="rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white">Send</button>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-[var(--secondary)]">No conversations yet.</div>
        )}
      </section>
    </div>
  )
}

function CommunityPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[30px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-soft sm:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--navy)]">A community built for <span className="text-[var(--primary)]">shared growth.</span></h1>
          <p className="mt-3 text-base text-[var(--secondary)]">Student stories, peer insights and new skills are unfolding every day across campus.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((story) => (
            <div key={story.name} className="rounded-[24px] border border-[var(--border)] bg-[var(--soft-lavender)] p-5">
              <div className="flex items-center gap-3">
                <img src={story.avatar} alt={story.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-[var(--navy)]">{story.name}</div>
                  <div className="text-sm text-[var(--secondary)]">{story.course}</div>
                </div>
              </div>
              <div className="mt-4 flex gap-1 text-[var(--primary)]">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={14} fill="currentColor" />)}
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--secondary)]">“{story.quote}”</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function HowItWorksPage() {
  const steps = [
    { title: 'Create Your Profile', description: 'Showcase what you know and what you would love to learn.' },
    { title: 'Discover Your Match', description: 'Find students whose skills and interests complement yours.' },
    { title: 'Connect and Exchange', description: 'Like profiles, find mutual matches and arrange learning sessions.' },
    { title: 'Grow Together', description: 'Complete exchanges, share feedback and build your learning community.' },
  ]

  return (
    <div className="space-y-8">
      <section className="rounded-[30px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-soft sm:p-8">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--navy)]">How Does SkillCircle Work?</h1>
        </div>
        <div className="mt-8 space-y-5">
          {steps.map((step, index) => (
            <div key={step.title} className="grid gap-4 rounded-[24px] border border-[var(--border)] bg-[var(--bg-main)] p-5 md:grid-cols-[80px_1fr_200px] md:items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)] text-xl font-black text-white">0{index + 1}</div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--navy)]">{step.title}</h3>
                <p className="mt-2 text-base text-[var(--secondary)]">{step.description}</p>
              </div>
              <div className="rounded-[20px] bg-[var(--soft-lavender)] p-4 text-center text-sm font-semibold text-[var(--navy)]">Campus learning flow</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
