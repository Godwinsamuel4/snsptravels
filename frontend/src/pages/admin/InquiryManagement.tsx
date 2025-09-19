
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Search,
  Reply,
  Archive,
  Trash2,
  Eye,
  Clock,
  Mail,
  Phone,
  User,
  MessageSquare,
  Send
} from "lucide-react";

// Mock inquiries data
const mockInquiries = [
  {
    id: "INQ001",
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "+234 801 234 5678",
    subject: "Holiday Package Inquiry",
    message: "I'm interested in your Dubai holiday package for 4 people. Can you provide more details about the pricing and what's included?",
    status: "New",
    priority: "Medium",
    date: "2025-01-16",
    service: "Holiday Packages"
  },
  {
    id: "INQ002",
    name: "Bob Davis",
    email: "bob@example.com", 
    phone: "+234 802 345 6789",
    subject: "Visa Application Help",
    message: "I need help with my UK visa application. What documents do I need to provide?",
    status: "Replied",
    priority: "High",
    date: "2025-01-15",
    service: "Visa Application"
  },
  {
    id: "INQ003",
    name: "Carol White",
    email: "carol@example.com",
    phone: "+234 803 456 7890",
    subject: "Flight Change Request",
    message: "I need to change my flight booking from March 20th to March 25th. Is this possible?",
    status: "In Progress", 
    priority: "High",
    date: "2025-01-14",
    service: "Flight Booking"
  },
  {
    id: "INQ004",
    name: "David Wilson",
    email: "david@example.com",
    phone: "+234 804 567 8901",
    subject: "Study Abroad Consultation",
    message: "I want to study in Canada. Can you help me with the application process?",
    status: "New",
    priority: "Medium",
    date: "2025-01-13",
    service: "Study Abroad"
  }
];

export default function InquiryManagement() {
  const [inquiries, setInquiries] = useState(mockInquiries);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [showReplyModal, setShowReplyModal] = useState(false);

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = 
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || inquiry.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || inquiry.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new": return "bg-blue-100 text-blue-800";
      case "replied": return "bg-green-100 text-green-800";
      case "in progress": return "bg-yellow-100 text-yellow-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-purple-100 text-purple-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-orange-100 text-orange-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewInquiry = (inquiry: any) => {
    setSelectedInquiry(inquiry);
  };

  const handleReplyInquiry = (inquiry: any) => {
    setSelectedInquiry(inquiry);
    setShowReplyModal(true);
  };

  const handleSendReply = () => {
    console.log("Sending reply to:", selectedInquiry.id);
    console.log("Reply message:", replyMessage);
    
    // Update inquiry status to replied
    setInquiries(prev => prev.map(inq => 
      inq.id === selectedInquiry.id ? { ...inq, status: "Replied" } : inq
    ));
    
    setShowReplyModal(false);
    setReplyMessage("");
    alert("Reply sent successfully!");
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setInquiries(prev => prev.map(inq => 
      inq.id === id ? { ...inq, status: newStatus } : inq
    ));
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      setInquiries(prev => prev.filter(inq => inq.id !== id));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
      alert("Inquiry deleted successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Inquiry Management</h1>
              <p className="text-muted-foreground mt-2">Manage customer inquiries and provide support</p>
            </div>
            <Badge variant="outline">{filteredInquiries.length} inquiries</Badge>
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
                  placeholder="Search inquiries by name, subject, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-inquiries"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40" data-testid="select-status-filter">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Replied">Replied</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-40" data-testid="select-priority-filter">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Priority</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inquiries List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Inquiries ({filteredInquiries.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className={`p-4 border rounded-lg transition-all cursor-pointer ${
                        selectedInquiry?.id === inquiry.id ? "border-primary bg-primary/5" : "hover:border-muted"
                      }`}
                      onClick={() => handleViewInquiry(inquiry)}
                      data-testid={`inquiry-item-${inquiry.id}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">{inquiry.name}</h3>
                            <Badge className={getStatusColor(inquiry.status)} variant="secondary">
                              {inquiry.status}
                            </Badge>
                            <Badge className={getPriorityColor(inquiry.priority)} variant="secondary">
                              {inquiry.priority}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-foreground mb-1">{inquiry.subject}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {inquiry.message.substring(0, 100)}...
                          </p>
                        </div>
                        
                        <div className="flex gap-1 ml-4">
                          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleViewInquiry(inquiry); }} data-testid={`button-view-${inquiry.id}`}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleReplyInquiry(inquiry); }} data-testid={`button-reply-${inquiry.id}`}>
                            <Reply className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleDeleteInquiry(inquiry.id); }} data-testid={`button-delete-${inquiry.id}`}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {inquiry.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {inquiry.service}
                          </div>
                        </div>
                        
                        <Select value={inquiry.status} onValueChange={(value) => handleUpdateStatus(inquiry.id, value)}>
                          <SelectTrigger className="w-28 h-6 text-xs" data-testid={`select-status-${inquiry.id}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Replied">Replied</SelectItem>
                            <SelectItem value="Closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}

                  {filteredInquiries.length === 0 && (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No inquiries found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inquiry Details */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Inquiry Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedInquiry ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Customer Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {selectedInquiry.name}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {selectedInquiry.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          {selectedInquiry.phone}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Inquiry Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ID:</span>
                          <span>#{selectedInquiry.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Service:</span>
                          <span>{selectedInquiry.service}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Priority:</span>
                          <Badge className={getPriorityColor(selectedInquiry.priority)} variant="secondary">
                            {selectedInquiry.priority}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date:</span>
                          <span>{selectedInquiry.date}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Subject</h4>
                      <p className="text-sm text-foreground">{selectedInquiry.subject}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Message</h4>
                      <p className="text-sm text-muted-foreground">{selectedInquiry.message}</p>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1" onClick={() => handleReplyInquiry(selectedInquiry)} data-testid="button-reply-inquiry">
                        <Reply className="mr-2 h-4 w-4" />
                        Reply
                      </Button>
                      <Button variant="outline" onClick={() => handleUpdateStatus(selectedInquiry.id, "Closed")} data-testid="button-close-inquiry">
                        <Archive className="mr-2 h-4 w-4" />
                        Close
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Select an inquiry to view details
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reply Modal */}
        {showReplyModal && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle>Reply to {selectedInquiry?.name}</CardTitle>
                <p className="text-sm text-muted-foreground">Re: {selectedInquiry?.subject}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Type your reply here..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={6}
                  data-testid="textarea-reply-message"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowReplyModal(false)} data-testid="button-cancel-reply">
                    Cancel
                  </Button>
                  <Button onClick={handleSendReply} disabled={!replyMessage.trim()} data-testid="button-send-reply">
                    <Send className="mr-2 h-4 w-4" />
                    Send Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
