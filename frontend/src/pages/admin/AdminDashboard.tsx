import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Users, 
  Plane, 
  MessageSquare, 
  FileText,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  MapPin
} from "lucide-react";

// Todo: remove mock functionality - replace with real admin data
const dashboardStats = [
  { title: "Total Bookings", value: "1,234", change: "+12%", icon: Plane, color: "text-blue-600" },
  { title: "Active Inquiries", value: "56", change: "+5%", icon: MessageSquare, color: "text-green-600" },
  { title: "Blog Posts", value: "28", change: "+3%", icon: FileText, color: "text-purple-600" },
  { title: "Total Clients", value: "5,678", change: "+8%", icon: Users, color: "text-orange-600" }
];

const recentBookings = [
  { id: "1", client: "John Doe", service: "Flight Booking", destination: "Dubai", status: "Pending", date: "2025-01-16" },
  { id: "2", client: "Jane Smith", service: "Visa Application", destination: "UK", status: "Processing", date: "2025-01-15" },
  { id: "3", client: "Mike Johnson", service: "Hotel Booking", destination: "Paris", status: "Confirmed", date: "2025-01-14" },
  { id: "4", client: "Sarah Wilson", service: "Study Abroad", destination: "Canada", status: "Pending", date: "2025-01-13" }
];

const recentInquiries = [
  { id: "1", name: "Alice Brown", subject: "Holiday Package Inquiry", status: "New", date: "2025-01-16" },
  { id: "2", name: "Bob Davis", subject: "Visa Application Help", status: "Replied", date: "2025-01-15" },
  { id: "3", name: "Carol White", subject: "Flight Change Request", status: "In Progress", date: "2025-01-14" }
];

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "new": return "bg-purple-100 text-purple-800";
      case "replied": return "bg-green-100 text-green-800";
      case "in progress": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewBooking = (id: string) => {
    console.log("View booking:", id);
    // Navigate to booking details page
    window.location.href = `/admin/bookings?id=${id}`;
  };

  const handleEditBooking = (id: string) => {
    console.log("Edit booking:", id);
    // Navigate to booking edit page
    window.location.href = `/admin/bookings?edit=${id}`;
  };

  const handleDeleteBooking = (id: string) => {
    console.log("Delete booking:", id);
    if (confirm("Are you sure you want to delete this booking?")) {
      alert(`Booking ${id} has been deleted successfully!`);
      // In a real app, you would make an API call to delete the booking
    }
  };

  const handleNewBooking = () => {
    console.log("Create new booking");
    window.location.href = '/admin/bookings?new=true';
  };

  const handleCreateBlogPost = () => {
    console.log("Create new blog post");
    window.location.href = '/admin/blog?new=true';
  };

  const handleManageInquiries = () => {
    console.log("Manage inquiries");
    window.location.href = '/admin/inquiries';
  };

  const handleViewReports = () => {
    console.log("View reports");
    alert("Reports feature: Coming soon! This will show analytics, booking trends, and revenue reports.");
  };

  const handleManageTours = () => {
    console.log("Manage tours");
    window.location.href = '/admin/tours';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Admin Header */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening with SN.SP Limited.</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Admin Panel</Badge>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                {selectedPeriod}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} data-testid={`stat-${index}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-green-600">
                        <TrendingUp className="h-3 w-3 inline mr-1" />
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`p-3 rounded-full bg-muted`}>
                      <IconComponent className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Bookings</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-view-all-bookings">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg" data-testid={`booking-${booking.id}`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-foreground">{booking.client}</p>
                        <Badge className={getStatusColor(booking.status)} variant="secondary">
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{booking.service} - {booking.destination}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3" />
                        {booking.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleViewBooking(booking.id)} data-testid={`button-view-${booking.id}`}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditBooking(booking.id)} data-testid={`button-edit-${booking.id}`}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteBooking(booking.id)} data-testid={`button-delete-${booking.id}`}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Inquiries */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Inquiries</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-view-all-inquiries">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex items-center justify-between p-3 border rounded-lg" data-testid={`inquiry-${inquiry.id}`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-foreground">{inquiry.name}</p>
                        <Badge className={getStatusColor(inquiry.status)} variant="secondary">
                          {inquiry.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{inquiry.subject}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3" />
                        {inquiry.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" data-testid={`button-reply-${inquiry.id}`}>
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Button className="h-auto p-4 flex-col" onClick={handleNewBooking} data-testid="button-new-booking">
                <Plane className="h-6 w-6 mb-2" />
                New Booking
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col" onClick={handleCreateBlogPost} data-testid="button-create-blog">
                <FileText className="h-6 w-6 mb-2" />
                Create Blog Post
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col" onClick={handleManageInquiries} data-testid="button-manage-inquiries">
                <MessageSquare className="h-6 w-6 mb-2" />
                Manage Inquiries
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col" onClick={handleManageTours} data-testid="button-manage-tours">
                <MapPin className="h-6 w-6 mb-2" />
                Manage Tours
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col" onClick={handleViewReports} data-testid="button-view-reports">
                <TrendingUp className="h-6 w-6 mb-2" />
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm text-foreground">All systems operational</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <span className="text-sm text-foreground">3 visa applications need review</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Last Backup</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm text-foreground">2 hours ago</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}