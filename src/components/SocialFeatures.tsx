
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Users, MessageCircle, Trophy, Share2, Heart, ThumbsUp, Award } from "lucide-react";

interface Post {
  id: number;
  user: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  type: 'workout' | 'achievement' | 'progress' | 'general';
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  participants: number;
  duration: string;
  reward: string;
  progress: number;
  joined: boolean;
}

const SocialFeatures = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [newPost, setNewPost] = useState("");
  const [activeTab, setActiveTab] = useState("feed");
  const { toast } = useToast();

  useEffect(() => {
    initializeSocialData();
  }, []);

  const initializeSocialData = () => {
    const mockPosts: Post[] = [
      {
        id: 1,
        user: "Sarah Wilson",
        avatar: "",
        content: "Just completed my first 5K run! 🏃‍♀️ Feeling amazing and ready for the next challenge!",
        likes: 24,
        comments: 8,
        timestamp: "2 hours ago",
        type: "achievement"
      },
      {
        id: 2,
        user: "Mike Johnson",
        avatar: "",
        content: "Week 4 of my fitness journey - down 3kg and feeling stronger every day! 💪",
        likes: 31,
        comments: 12,
        timestamp: "5 hours ago",
        type: "progress"
      },
      {
        id: 3,
        user: "Emma Davis",
        avatar: "",
        content: "Morning workout done! Nothing beats starting the day with some strength training 🏋️‍♀️",
        likes: 18,
        comments: 5,
        timestamp: "1 day ago",
        type: "workout"
      },
      {
        id: 4,
        user: "Alex Chen",
        avatar: "",
        content: "Meal prep Sunday! Prepared healthy meals for the entire week. Consistency is key! 🥗",
        likes: 45,
        comments: 15,
        timestamp: "2 days ago",
        type: "general"
      }
    ];

    const mockChallenges: Challenge[] = [
      {
        id: 1,
        title: "30-Day Squat Challenge",
        description: "Complete 100 squats daily for 30 days",
        participants: 156,
        duration: "30 days",
        reward: "Leg Strength Badge",
        progress: 45,
        joined: false
      },
      {
        id: 2,
        title: "Weekly Cardio Goal",
        description: "Complete 150 minutes of cardio this week",
        participants: 89,
        duration: "7 days",
        reward: "Cardio Master Badge",
        progress: 60,
        joined: true
      },
      {
        id: 3,
        title: "Hydration Hero",
        description: "Drink 8 glasses of water daily for 2 weeks",
        participants: 234,
        duration: "14 days",
        reward: "Hydration Badge",
        progress: 0,
        joined: false
      },
      {
        id: 4,
        title: "Protein Power Week",
        description: "Hit your protein goal every day this week",
        participants: 78,
        duration: "7 days",
        reward: "Nutrition Expert Badge",
        progress: 85,
        joined: true
      }
    ];

    setPosts(mockPosts);
    setChallenges(mockChallenges);
  };

  const sharePost = () => {
    if (!newPost.trim()) {
      toast({
        title: "Please write something to share",
        variant: "destructive",
      });
      return;
    }

    const post: Post = {
      id: Date.now(),
      user: user.name || "You",
      avatar: "",
      content: newPost,
      likes: 0,
      comments: 0,
      timestamp: "Just now",
      type: "general"
    };

    setPosts([post, ...posts]);
    setNewPost("");

    toast({
      title: "Post shared! 📱",
      description: "Your update has been shared with the community",
    });
  };

  const likePost = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const joinChallenge = (challengeId: number) => {
    setChallenges(challenges.map(challenge =>
      challenge.id === challengeId
        ? { ...challenge, joined: true, participants: challenge.participants + 1 }
        : challenge
    ));

    const challenge = challenges.find(c => c.id === challengeId);
    toast({
      title: "Challenge joined! 🎯",
      description: `You've joined the ${challenge?.title}. Good luck!`,
    });
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'workout': return '🏋️‍♀️';
      case 'achievement': return '🏆';
      case 'progress': return '📈';
      default: return '💬';
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'workout': return 'border-blue-200 bg-blue-50';
      case 'achievement': return 'border-yellow-200 bg-yellow-50';
      case 'progress': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex space-x-4 border-b">
        <Button
          variant={activeTab === "feed" ? "default" : "ghost"}
          onClick={() => setActiveTab("feed")}
          className="flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Community Feed
        </Button>
        <Button
          variant={activeTab === "challenges" ? "default" : "ghost"}
          onClick={() => setActiveTab("challenges")}
          className="flex items-center gap-2"
        >
          <Trophy className="w-4 h-4" />
          Challenges
        </Button>
        <Button
          variant={activeTab === "leaderboard" ? "default" : "ghost"}
          onClick={() => setActiveTab("leaderboard")}
          className="flex items-center gap-2"
        >
          <Award className="w-4 h-4" />
          Leaderboard
        </Button>
      </div>

      {activeTab === "feed" && (
        <div className="space-y-6">
          {/* Share Post */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your workout, achievement, or motivate others..."
                  className="min-h-[100px]"
                />
                <Button onClick={sharePost} className="w-full">
                  Share Post
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className={getPostTypeColor(post.type)}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={post.avatar} />
                      <AvatarFallback>
                        {post.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{post.user}</h4>
                        <span className="text-lg">{getPostTypeIcon(post.type)}</span>
                        <span className="text-sm text-gray-500">{post.timestamp}</span>
                      </div>
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => likePost(post.id)}
                          className="flex items-center gap-2"
                        >
                          <Heart className="w-4 h-4" />
                          {post.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          {post.comments}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "challenges" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Challenges</CardTitle>
              <p className="text-sm text-gray-600">Join challenges to stay motivated and earn badges!</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className={`border-2 rounded-lg p-4 ${
                      challenge.joined ? 'border-green-300 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{challenge.title}</h4>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                      {challenge.joined && (
                        <Trophy className="w-6 h-6 text-green-500" />
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Duration: {challenge.duration}</span>
                        <span>Reward: {challenge.reward}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{challenge.participants} participants</span>
                        {challenge.joined && (
                          <span className="text-green-600 font-medium">
                            Progress: {challenge.progress}%
                          </span>
                        )}
                      </div>
                    </div>

                    {challenge.joined ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Your Progress</span>
                          <span>{challenge.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${challenge.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => joinChallenge(challenge.id)}
                        className="w-full"
                        variant="outline"
                      >
                        Join Challenge
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "leaderboard" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Weekly Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rank: 1, name: "Sarah Wilson", points: 850, badge: "🥇" },
                  { rank: 2, name: "Mike Johnson", points: 720, badge: "🥈" },
                  { rank: 3, name: "Emma Davis", points: 680, badge: "🥉" },
                  { rank: 4, name: user.name || "You", points: 520, badge: "🏅" },
                  { rank: 5, name: "Alex Chen", points: 480, badge: "⭐" }
                ].map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      entry.name === (user.name || "You") ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{entry.badge}</span>
                      <div>
                        <div className="font-semibold">
                          {entry.name}
                          {entry.name === (user.name || "You") && (
                            <span className="text-blue-600 ml-2">(You)</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">Rank #{entry.rank}</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      {entry.points} pts
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Earn Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Complete a workout</span>
                    <span className="font-bold text-green-600">+50 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Log daily nutrition</span>
                    <span className="font-bold text-green-600">+30 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Complete a challenge</span>
                    <span className="font-bold text-green-600">+100 pts</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Share progress post</span>
                    <span className="font-bold text-green-600">+25 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekly consistency bonus</span>
                    <span className="font-bold text-green-600">+200 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Help community member</span>
                    <span className="font-bold text-green-600">+40 pts</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SocialFeatures;
