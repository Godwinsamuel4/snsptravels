import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

// Todo: remove mock functionality - replace with real booking data
const mockBookings = [
  {
    id: "BK001",
    client: { name: "John Doe", email: "john@email.com", phone: "+234 901 234 5678" },
    service: "Flight Booking",
    destination: "Dubai, UAE",
    status: "Confirmed",
    bookingDate: "2025-01-16",
    travelDate: "2025-02-15",
    amount: "$1,200",
    notes: "Business class preferred"
  },
  {
    id: "BK002", 
    client: { name: "Jane Smith", email: "jane@email.com", phone: "+234 802 345 6789" },
    service: "Visa Application",
    destination: "United Kingdom",
    status: "Processing",
    bookingDate: "2025-01-15",
    travelDate: "2025-03-01",
    amount: "$450",
    notes: "Tourist visa, 2 weeks stay"
  },
  {
    id: "BK003",
    client: { name: "Mike Johnson", email: "mike@email.com", phone: "+234 703 456 7890" },
    service: "Hotel Booking",
    destination: "Paris, France",
    status: "Confirmed",
    bookingDate: "2025-01-14",
    travelDate: "2025-02-20",
    amount: "$800",
    notes: "5-star hotel, city center"
  },
  {
    id: "BK004",
    client: { name: "Sarah Wilson", email: "sarah@email.com", phone: "+234 804 567 8901" },
    service: "Study Abroad",
    destination: "Toronto, Canada",
    status: "Pending",
    bookingDate: "2025-01-13",
    travelDate: "2025-09-01",
    amount: "$2,500",
    notes: "MBA program application"
  }
];

export default function BookingManagement() {
  const [bookings, setBookings] = useState(mockBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || booking.status === statusFilter;
    const matchesService = serviceFilter === "All" || booking.service === serviceFilter;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    console.log("Viewing booking:", booking);
  };

  const handleEditBooking = (id: string) => {
    console.log("Edit booking:", id);
    alert(`Editing booking ${id}. Feature coming soon!`);
  };

  const handleDeleteBooking = (id: string) => {
    console.log("Delete booking:", id);
    if (confirm("Are you sure you want to delete this booking?")) {
      setBookings(prev => prev.filter(b => b.id !== id));
      alert(`Booking ${id} deleted!`);
    }
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setBookings(prev => prev.map(b => 
      b.id === id ? { ...b, status: newStatus } : b
    ));
    console.log(`Updated booking ${id} status to ${newStatus}`);
  };

  const handleExport = () => {
    console.log("Exporting bookings");
    alert("Exporting bookings to CSV. Feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Booking Management</h1>
              <p className="text-muted-foreground mt-2">Manage all customer bookings and reservations</p>
            </div>
            <Button onClick={handleExport} data-testid="button-export">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bookings by client name, booking ID, or destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-bookings"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40" data-testid="select-status-filter">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="w-48" data-testid="select-service-filter">
                  <SelectValue placeholder="Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Services</SelectItem>
                  <SelectItem value="Flight Booking">Flight Booking</SelectItem>
                  <SelectItem value="Hotel Booking">Hotel Booking</SelectItem>
                  <SelectItem value="Visa Application">Visa Application</SelectItem>
                  <SelectItem value="Study Abroad">Study Abroad</SelectItem>
                  <SelectItem value="Holiday Package">Holiday Package</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bookings List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Bookings ({filteredBookings.length})
                  <Badge variant="outline">{filteredBookings.length} of {bookings.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className={`p-4 border rounded-lg transition-all cursor-pointer ${
                        selectedBooking?.id === booking.id ? "border-primary bg-primary/5" : "hover:border-muted"
                      }`}
                      onClick={() => handleViewBooking(booking)}
                      data-testid={`booking-item-${booking.id}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{booking.client.name}</h3>
                            <Badge className={getStatusColor(booking.status)} variant="secondary">
                              {booking.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">#{booking.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{booking.amount}</p>
                          <p className="text-xs text-muted-foreground">{booking.service}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {booking.destination}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {booking.travelDate}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          Booked: {booking.bookingDate}
                        </p>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleViewBooking(booking); }} data-testid={`button-view-${booking.id}`}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleEditBooking(booking.id); }} data-testid={`button-edit-${booking.id}`}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleDeleteBooking(booking.id); }} data-testid={`button-delete-${booking.id}`}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredBookings.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No bookings found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Details */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedBooking ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Client Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {selectedBooking.client.name}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {selectedBooking.client.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          {selectedBooking.client.phone}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Booking Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Booking ID:</span>
                          <span>#{selectedBooking.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Service:</span>
                          <span>{selectedBooking.service}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Destination:</span>
                          <span>{selectedBooking.destination}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Travel Date:</span>
                          <span>{selectedBooking.travelDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="font-semibold">{selectedBooking.amount}</span>
                        </div>
                      </div>
                    </div>

                    {selectedBooking.notes && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Notes</h4>
                        <p className="text-sm text-muted-foreground">{selectedBooking.notes}</p>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Update Status</h4>
                      <Select value={selectedBooking.status} onValueChange={(value) => handleUpdateStatus(selectedBooking.id, value)}>
                        <SelectTrigger data-testid="select-update-status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Processing">Processing</SelectItem>
                          <SelectItem value="Confirmed">Confirmed</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1" data-testid="button-contact-client">
                        Contact Client
                      </Button>
                      <Button variant="outline" className="flex-1" data-testid="button-edit-details">
                        Edit Details
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Select a booking to view details
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}