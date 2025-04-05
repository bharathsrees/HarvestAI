
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Book, CalendarCheck, Users } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/hooks/use-i18n";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@supabase/supabase-js";

// Mock posts until Supabase integration is implemented
const MOCK_POSTS = [
  {
    id: 1,
    title: "Dealing with wheat rust disease",
    content: "I've been noticing some orange-brown powdery spots on my wheat crop leaves. I suspect it might be wheat rust. Has anyone dealt with this before? What's the best organic treatment?",
    author: {
      name: "Ravi Kumar",
      avatar: "https://i.pravatar.cc/150?u=ravi",
      role: "Wheat Farmer"
    },
    date: "2 days ago",
    comments: [
      {
        id: 1,
        content: "Wheat rust can be treated with a sulfur-based fungicide. Also try to improve air circulation between plants by proper spacing.",
        author: {
          name: "Dr. Priya",
          avatar: "https://i.pravatar.cc/150?u=priya",
          role: "Plant Pathologist"
        },
        date: "1 day ago"
      },
      {
        id: 2,
        content: "I faced the same issue last season. Rotating crops helped a lot to break the disease cycle.",
        author: {
          name: "Muthukumar",
          avatar: "https://i.pravatar.cc/150?u=muthu",
          role: "Organic Farmer"
        },
        date: "12 hours ago"
      }
    ],
    likes: 24,
    tags: ["wheat", "disease", "organic"]
  },
  {
    id: 2,
    title: "Best irrigation practices for rice during summer",
    content: "With the temperatures rising in Coimbatore, I'm concerned about water management for my rice paddies. Are there any efficient irrigation techniques you'd recommend to conserve water while ensuring good yield?",
    author: {
      name: "Lakshmi",
      avatar: "https://i.pravatar.cc/150?u=lakshmi",
      role: "Rice Farmer"
    },
    date: "3 days ago",
    comments: [
      {
        id: 3,
        content: "Try the Alternate Wetting and Drying (AWD) technique. It can save up to 30% water without affecting yields.",
        author: {
          name: "Dr. Ramesh",
          avatar: "https://i.pravatar.cc/150?u=ramesh",
          role: "Agricultural Scientist"
        },
        date: "2 days ago"
      }
    ],
    likes: 18,
    tags: ["rice", "irrigation", "water-conservation"]
  }
];

// Create Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type FormData = {
  title: string;
  content: string;
};

type CommentData = {
  content: string;
};

const CommunityPage = () => {
  const { t } = useI18n();
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [activePost, setActivePost] = useState<number | null>(null);
  const [commentForms, setCommentForms] = useState<Record<number, boolean>>({});
  
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { register: registerComment, handleSubmit: handleCommentSubmit, reset: resetComment } = useForm<CommentData>();

  const toggleCommentForm = (postId: number) => {
    setCommentForms(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const onSubmit = async (data: FormData) => {
    try {
      // In a real implementation, this would use Supabase
      // const { data: newPost, error } = await supabase
      //   .from('posts')
      //   .insert([
      //     { title: data.title, content: data.content, user_id: userId }
      //   ])
      //   .select();
      
      // For now, we'll mock it
      const newPost = {
        id: posts.length + 1,
        title: data.title,
        content: data.content,
        author: {
          name: "You",
          avatar: "https://i.pravatar.cc/150?u=you",
          role: "Farmer"
        },
        date: "Just now",
        comments: [],
        likes: 0,
        tags: []
      };
      
      setPosts([newPost, ...posts]);
      reset();
      toast({
        title: "Post created!",
        description: "Your post has been published to the community.",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "Failed to create your post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onCommentSubmit = async (postId: number, data: CommentData) => {
    try {
      // In a real implementation, this would use Supabase
      // const { data: newComment, error } = await supabase
      //   .from('comments')
      //   .insert([
      //     { content: data.content, post_id: postId, user_id: userId }
      //   ])
      //   .select();
      
      // For now, we'll mock it
      const newComment = {
        id: Math.floor(Math.random() * 1000),
        content: data.content,
        author: {
          name: "You",
          avatar: "https://i.pravatar.cc/150?u=you",
          role: "Farmer"
        },
        date: "Just now"
      };
      
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      });
      
      setPosts(updatedPosts);
      resetComment();
      toggleCommentForm(postId);
      toast({
        title: "Comment added!",
        description: "Your comment has been added to the post.",
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: "Failed to add your comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 dark:bg-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("community.title", "Farmer Community")}
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              {t("community.description", "Connect with fellow farmers, researchers and agricultural enthusiasts")}
            </p>
          </div>
          
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                Posts
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-2">
                <CalendarCheck className="h-4 w-4" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="groups" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Groups
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>{t("community.post.title", "Create a Post")}</CardTitle>
                  <CardDescription>
                    Share your farming experience or ask a question to the community
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Post title"
                      {...register("title", { required: true })}
                    />
                    <Textarea
                      placeholder={t("community.post.placeholder", "Share your farming experience or ask a question...")}
                      className="min-h-32"
                      {...register("content", { required: true })}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="bg-harvest-primary hover:bg-harvest-secondary">
                      {t("community.post.submit", "Submit Post")}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
              
              <div className="space-y-6">
                {posts.map(post => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-xl">{post.title}</CardTitle>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-medium">{post.author.name}</span>
                              <span className="mx-1">•</span>
                              <span>{post.author.role}</span>
                              <span className="mx-1">•</span>
                              <span>{post.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-line mb-4">{post.content}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {post.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-harvest-light text-harvest-primary text-xs rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start">
                      <div className="flex items-center space-x-4 mb-2 w-full">
                        <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400">
                          👍 {post.likes}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-500 dark:text-gray-400"
                          onClick={() => toggleCommentForm(post.id)}
                        >
                          💬 {post.comments.length}
                        </Button>
                      </div>
                      
                      {post.comments.length > 0 && (
                        <>
                          <Separator className="my-4 w-full" />
                          <div className="space-y-4 w-full">
                            {post.comments.map(comment => (
                              <div key={comment.id} className="flex items-start space-x-4">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                                  <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                                    <div className="flex items-center text-sm mb-1">
                                      <span className="font-medium">{comment.author.name}</span>
                                      <span className="mx-1">•</span>
                                      <span className="text-gray-500 dark:text-gray-400">{comment.date}</span>
                                    </div>
                                    <p>{comment.content}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                      
                      {commentForms[post.id] && (
                        <form 
                          className="mt-4 w-full"
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleCommentSubmit((data) => onCommentSubmit(post.id, data))();
                          }}
                        >
                          <div className="flex items-start space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="https://i.pravatar.cc/150?u=you" alt="You" />
                              <AvatarFallback>Y</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <Textarea
                                placeholder={t("community.comment.placeholder", "Write a comment...")}
                                className="min-h-16"
                                {...registerComment("content", { required: true })}
                              />
                              <div className="flex justify-end mt-2">
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="sm"
                                  className="mr-2"
                                  onClick={() => toggleCommentForm(post.id)}
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  type="submit" 
                                  size="sm"
                                  className="bg-harvest-primary hover:bg-harvest-secondary"
                                >
                                  {t("community.comment.submit", "Comment")}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </form>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest posts and comments from the community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This section will show recent community activity.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="groups" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Farming Groups</CardTitle>
                  <CardDescription>
                    Join specialized farming groups based on your interests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Organic Farming</CardTitle>
                        <CardDescription>342 members</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>Discuss natural farming methods and organic certification</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline">Join Group</Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Tech in Agriculture</CardTitle>
                        <CardDescription>187 members</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>Explore new technologies revolutionizing farming</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline">Join Group</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityPage;
