import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const departments = [
    "Computer Science",
    "Information Technology",
    "Electronics",
    "Mechanical",
    "Civil"
  ];

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Update Profile</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input placeholder="Enter your full name" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="Enter your email" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Enrollment Number</label>
              <Input placeholder="Enter your enrollment number" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Year of Study</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Year of Study</SelectLabel>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toLowerCase()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Department</SelectLabel>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept.toLowerCase()}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4">
              <Button>Update Profile</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;