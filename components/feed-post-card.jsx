"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Share2, MapPin, MoreVertical } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { likeFeedPost, hasUserLikedPost, addFeedComment, getFeedComments } from "@/lib/feed-data"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export function FeedPostCard({ post, onUpdate }) {
  const { user } = useAuth()
  const [isLiked, setIsLiked] = useState(user ? hasUserLikedPost(post.id, user.id) : false)
  const [likes, setLikes] = useState(post.likes)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState(getFeedComments(post.id))
  const [commentText, setCommentText] = useState("")

  const handleLike = () => {
    if (!user) {
      alert("Faça login para curtir posts")
      return
    }

    const updatedPost = likeFeedPost(post.id, user.id)
    if (updatedPost) {
      setIsLiked(!isLiked)
      setLikes(updatedPost.likes)
      if (onUpdate) onUpdate()
    }
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (!user) {
      alert("Faça login para comentar")
      return
    }

    if (commentText.trim()) {
      const newComment = addFeedComment(post.id, user.id, user.name, commentText)
      setComments([...comments, newComment])
      setCommentText("")
      if (onUpdate) onUpdate()
    }
  }

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: ptBR,
  })

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4 pb-3">
        <Link href={`/ongs/${post.ngoId}`}>
          <Avatar className="h-10 w-10 cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarImage src={post.ngoAvatar || "/placeholder.svg"} alt={post.ngoName} />
            <AvatarFallback>{post.ngoName[0]}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1">
          <Link href={`/ongs/${post.ngoId}`} className="font-semibold hover:underline">
            {post.ngoName}
          </Link>
          {post.location && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {post.location}
            </p>
          )}
        </div>
        <Button variant="ghost" size="icon" aria-label="Mais opções">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-3 px-0 pb-0">
        {post.images && post.images.length > 0 && (
          <div className="w-full">
            <img src={post.images[0] || "/placeholder.svg"} alt="Post" className="w-full object-cover max-h-[500px]" />
          </div>
        )}

        <div className="px-6 space-y-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className={isLiked ? "text-red-500 hover:text-red-600" : ""}
              aria-label={isLiked ? "Descurtir" : "Curtir"}
            >
              <Heart className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShowComments(!showComments)} aria-label="Comentar">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Compartilhar">
              <Share2 className="h-6 w-6" />
            </Button>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-sm">{likes.toLocaleString("pt-BR")} curtidas</p>
            <p className="text-sm">
              <Link href={`/ongs/${post.ngoId}`} className="font-semibold hover:underline">
                {post.ngoName}
              </Link>{" "}
              <span className="text-pretty leading-relaxed">{post.content}</span>
            </p>

            {post.comments > 0 && (
              <button
                onClick={() => setShowComments(!showComments)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Ver todos os {post.comments} comentários
              </button>
            )}

            <p className="text-xs text-muted-foreground uppercase">{timeAgo}</p>
          </div>
        </div>
      </CardContent>

      {showComments && (
        <CardFooter className="flex-col items-start gap-4 pt-4 border-t">
          <div className="w-full space-y-3 max-h-60 overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="text-sm">
                <span className="font-semibold">{comment.userName}</span>{" "}
                <span className="text-pretty leading-relaxed">{comment.text}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleComment} className="flex w-full gap-2">
            <Input
              placeholder="Adicione um comentário..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={!commentText.trim()}>
              Publicar
            </Button>
          </form>
        </CardFooter>
      )}
    </Card>
  )
}
