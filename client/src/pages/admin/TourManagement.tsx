
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload,
  MapPin,
  Eye,
  X,
  Check
} from "lucide-react";

// Mock tour data - replace with real data from your backend
const initialTours = [
  {
    id: 1,
    title: "Canada",
    caption: "Explore the stunning landscapes and vibrant cities of Canada",
    image: "/attached_assets/IMG-20250916-WA0022_1758093892791.jpg",
    status: "active"
  },
  {
    id: 2,
    title: "Jordan & Israel",
    caption: "Discover ancient history and religious sites in the Holy Land",
    image: "/attached_assets/IMG-20250916-WA0023_1758093892792.jpg",
    status: "active"
  },
  {
    id: 3,
    title: "Mauritius",
    caption: "Relax on pristine beaches and enjoy tropical paradise",
    image: "/attached_assets/IMG-20250916-WA0027_1758093892795.jpg",
    status: "active"
  }
];

export default function TourManagement() {
  const [tours, setTours] = useState(initialTours);
  const [isAddingTour, setIsAddingTour] = useState(false);
  const [editingTour, setEditingTour] = useState<number | null>(null);
  const [newTour, setNewTour] = useState({
    title: "",
    caption: "",
    image: "",
    status: "active"
  });

  const handleAddTour = () => {
    if (newTour.title && newTour.caption) {
      const tour = {
        id: Math.max(...tours.map(t => t.id)) + 1,
        ...newTour
      };
      setTours([...tours, tour]);
      setNewTour({ title: "", caption: "", image: "", status: "active" });
      setIsAddingTour(false);
      alert("Tour added successfully!");
    } else {
      alert("Please fill in all required fields");
    }
  };

  const handleEditTour = (id: number) => {
    const tour = tours.find(t => t.id === id);
    if (tour) {
      setNewTour(tour);
      setEditingTour(id);
    }
  };

  const handleUpdateTour = () => {
    if (editingTour && newTour.title && newTour.caption) {
      setTours(tours.map(tour => 
        tour.id === editingTour ? { ...tour, ...newTour } : tour
      ));
      setNewTour({ title: "", caption: "", image: "", status: "active" });
      setEditingTour(null);
      alert("Tour updated successfully!");
    }
  };

  const handleDeleteTour = (id: number) => {
    if (confirm("Are you sure you want to delete this tour?")) {
      setTours(tours.filter(tour => tour.id !== id));
      alert("Tour deleted successfully!");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to your server
      const imageUrl = URL.createObjectURL(file);
      setNewTour({ ...newTour, image: imageUrl });
    }
  };

  const resetForm = () => {
    setNewTour({ title: "", caption: "", image: "", status: "active" });
    setIsAddingTour(false);
    setEditingTour(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Admin Header */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Tour Management</h1>
              <p className="text-muted-foreground mt-2">Manage tour experiences and destinations</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Admin Panel</Badge>
              <Button 
                onClick={() => setIsAddingTour(true)}
                className="bg-primary text-primary-foreground"
                data-testid="button-add-tour"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Tour
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add/Edit Tour Form */}
        {(isAddingTour || editingTour) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {editingTour ? "Edit Tour" : "Add New Tour"}
                <Button variant="ghost" size="sm" onClick={resetForm}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Tour Title *</Label>
                  <Input
                    id="title"
                    value={newTour.title}
                    onChange={(e) => setNewTour({ ...newTour, title: e.target.value })}
                    placeholder="e.g., Dubai Adventure"
                    data-testid="input-tour-title"
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image"
                      value={newTour.image}
                      onChange={(e) => setNewTour({ ...newTour, image: e.target.value })}
                      placeholder="Image URL or upload file"
                      data-testid="input-tour-image"
                    />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <Button variant="outline" size="sm" type="button">
                        <Upload className="h-4 w-4" />
                      </Button>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </Label>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="caption">Caption *</Label>
                <Textarea
                  id="caption"
                  value={newTour.caption}
                  onChange={(e) => setNewTour({ ...newTour, caption: e.target.value })}
                  placeholder="Describe this tour experience..."
                  rows={3}
                  data-testid="input-tour-caption"
                />
              </div>

              {newTour.image && (
                <div>
                  <Label>Preview</Label>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                    <img 
                      src={newTour.image} 
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-white font-semibold text-lg mb-1">{newTour.title || "Tour Title"}</h3>
                      <p className="text-white/90 text-sm">{newTour.caption || "Tour caption will appear here..."}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  onClick={editingTour ? handleUpdateTour : handleAddTour}
                  className="bg-primary text-primary-foreground"
                  data-testid="button-save-tour"
                >
                  <Check className="mr-2 h-4 w-4" />
                  {editingTour ? "Update Tour" : "Add Tour"}
                </Button>
                <Button variant="outline" onClick={resetForm} data-testid="button-cancel-tour">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tours List */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Tours ({tours.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <div key={tour.id} className="border rounded-lg overflow-hidden" data-testid={`tour-item-${tour.id}`}>
                  <div className="relative h-48">
                    <img 
                      src={tour.image} 
                      alt={tour.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f3f4f6"/><text x="50" y="50" text-anchor="middle" dy=".3em" fill="%236b7280">No Image</text></svg>';
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <h3 className="text-white font-medium text-sm mb-1">{tour.title}</h3>
                      <p className="text-white/90 text-xs line-clamp-2">{tour.caption}</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge 
                        variant={tour.status === "active" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {tour.status}
                      </Badge>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditTour(tour.id)}
                          data-testid={`button-edit-tour-${tour.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteTour(tour.id)}
                          data-testid={`button-delete-tour-${tour.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{tour.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{tour.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {tours.length === 0 && (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No tours available. Add your first tour to get started!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
