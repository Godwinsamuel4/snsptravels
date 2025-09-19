
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  FileText,
  Save,
  X,
  Upload,
  Image as ImageIcon
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  status: 'draft' | 'published';
  date: string;
  image: string;
  imageAlt: string;
  views?: number;
}

interface BlogForm {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  status: 'draft' | 'published';
  image: string;
  imageAlt: string;
}

// Todo: remove mock functionality - replace with real blog data
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 Must-Visit Destinations in 2025",
    excerpt: "Discover the most breathtaking destinations that should be on every traveler's bucket list this year.",
    content: "Full article content here...",
    category: "Travel Tips",
    author: "Travel Team",
    status: 'published',
    date: "January 15, 2025",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
    imageAlt: "Beautiful tropical destination",
    views: 1250
  },
  {
    id: "2", 
    title: "How to Find the Best Flight Deals",
    excerpt: "Learn insider tips and tricks to save money on your next flight booking.",
    content: "Full article content here...",
    category: "Flight Tips",
    author: "SN.SP Team",
    status: 'draft',
    date: "January 10, 2025",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop",
    imageAlt: "Airplane flying above clouds",
    views: 0
  },
  {
    id: "3",
    title: "Ultimate Guide to Hotel Bookings",
    excerpt: "Discover how to book the perfect hotel for your stay.",
    content: "Full article content here...",
    category: "Hotels",
    author: "Hotel Expert", 
    status: 'published',
    date: "January 8, 2025",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop",
    imageAlt: "Luxury hotel lobby",
    views: 890
  }
];

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<BlogForm>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    status: 'draft',
    image: "",
    imageAlt: ""
  });

  const categories = ["Travel Tips", "Flight Tips", "Hotels", "Visa Guide", "Education", "Travel Safety"];
  const statusOptions = ["draft", "published"];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || post.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "published": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "archived": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const handleCreatePost = () => {
    setShowCreateForm(true);
    setEditingPost(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      author: "Admin",
      status: 'draft',
      image: "",
      imageAlt: ""
    });
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setShowCreateForm(true);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      status: post.status,
      image: post.image,
      imageAlt: post.imageAlt
    });
  };

  const handleSavePost = () => {
    if (editingPost) {
      // Update existing post
      setPosts(prev => prev.map(post => 
        post.id === editingPost.id 
          ? { 
              ...post, 
              ...formData,
              date: new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })
            }
          : post
      ));
    } else {
      // Create new post
      const newPost: BlogPost = {
        ...formData,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        views: 0
      };
      setPosts(prev => [newPost, ...prev]);
    }
    
    setShowCreateForm(false);
    setEditingPost(null);
  };

  const handleDeletePost = (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(prev => prev.filter(post => post.id !== postId));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server here
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          image: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreviewPost = (post: BlogPost) => {
    console.log("Preview post:", post);
    alert("Opening post preview. Feature coming soon!");
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setPosts(prev => prev.map(p => 
      p.id === id ? { ...p, status: newStatus as 'draft' | 'published' } : p
    ));
    console.log(`Updated post ${id} status to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Blog Management</h1>
              <p className="text-muted-foreground">Create and manage blog posts</p>
            </div>
            <Button onClick={handleCreatePost} data-testid="button-create-post">
              <Plus className="mr-2 h-4 w-4" />
              Create New Post
            </Button>
          </div>

          {!showCreateForm ? (
            <>
              {/* Filters */}
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                        data-testid="input-search-posts"
                      />
                    </div>
                    
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger data-testid="select-category-filter">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger data-testid="select-status-filter">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="text-sm text-muted-foreground flex items-center">
                      {filteredPosts.length} posts found
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Posts List */}
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <Card key={post.id} data-testid={`post-item-${post.id}`}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4 flex-1">
                          <div className="w-24 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            {post.image ? (
                              <img 
                                src={post.image} 
                                alt={post.imageAlt}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="h-6 w-6 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-foreground">{post.title}</h3>
                              <Badge className={getStatusColor(post.status)} variant="secondary">
                                {post.status}
                              </Badge>
                              <Badge variant="outline">{post.category}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {post.author}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {post.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {post.views} views
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handlePreviewPost(post)} data-testid={`button-preview-${post.id}`}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEditPost(post)} data-testid={`button-edit-${post.id}`}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeletePost(post.id)}
                            className="text-destructive hover:text-destructive"
                            data-testid={`button-delete-${post.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredPosts.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No blog posts found matching your criteria.</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Create/Edit Form */
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                  </CardTitle>
                  <Button variant="ghost" onClick={() => setShowCreateForm(false)} data-testid="button-close-editor">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter post title"
                        data-testid="input-post-title"
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger data-testid="select-post-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select 
                        value={formData.status} 
                        onValueChange={(value: 'draft' | 'published') => setFormData(prev => ({ ...prev, status: value }))}
                      >
                        <SelectTrigger data-testid="select-post-status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                        placeholder="Author name"
                        data-testid="input-post-author"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="image">Featured Image</Label>
                      <div className="space-y-2">
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                        <Input
                          placeholder="Or enter image URL"
                          value={formData.image}
                          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                        />
                        {formData.image && (
                          <div className="w-full h-32 rounded-lg overflow-hidden bg-muted">
                            <img 
                              src={formData.image} 
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="imageAlt">Image Alt Text</Label>
                      <Input
                        id="imageAlt"
                        value={formData.imageAlt}
                        onChange={(e) => setFormData(prev => ({ ...prev, imageAlt: e.target.value }))}
                        placeholder="Describe the image for accessibility"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description of the post"
                    rows={3}
                    data-testid="textarea-post-excerpt"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write your post content here..."
                    rows={10}
                    data-testid="textarea-post-content"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setShowCreateForm(false)} data-testid="button-cancel-edit">
                    Cancel
                  </Button>
                  <Button onClick={handleSavePost} data-testid="button-save-post">
                    <Save className="mr-2 h-4 w-4" />
                    {editingPost ? 'Update Post' : 'Create Post'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
