import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CheckCircle, BookOpen, AlertCircle, Loader2 } from "lucide-react";

import EnrolledCourseCard from "../../../Components/EnrolledCourseCard";
import { AuthContext } from "../../../context/AuthContext";

const MyEnrolledCourse = () => {
  const { user } = useContext(AuthContext);
  const [enrollData, setEnrollData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const [completingId, setCompletingId] = useState(null); // Tracks specific loading state for button click

  // Fetch initial enrollment data
  useEffect(() => {
    const fetchEnrolledData = async () => {
      if (!user?.email) return;

      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `http://localhost:3000/EnrolledData?email=${user.email}`
        );
        setEnrollData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load your enrolled courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledData();
  }, [user?.email]);

  // Handle marking a course as complete
  const handleMarkComplete = async (course) => {
    if (!user?.email) return;
    
    // Set loading state specifically for this course ID
    setCompletingId(course._id);

    const completionPayload = {
      userEmail: user.email,
      courseId: course._id || course.courseId,
      courseTitle: course.title || course.name,
      completedAt: new Date().toISOString(),
      completed: true,
      // Spreads additional relevant course details to save in db if necessary
      ...course 
    };

    try {
      // Sends the completed data payload to your database API endpoint
       const res =  await axios.post("http://localhost:3000/CompletedCourses", completionPayload);
       console.log(res.data);
       if(res.data.insertedId){
        // Optional state update: Filter out completed courses if this page only shows active ones
        setEnrollData(prev => prev.filter(item => item._id !== course._id));
       }
      
      // Visual feedback: Alert user or dynamically remove/update item in state
      alert(`Congratulations! "${course.title || course.name}" marked as complete.`);
      
      // Optional state update: Filter out completed courses if this page only shows active ones
      // setEnrollData(prev => prev.filter(item => item._id !== course._id));
      
    } catch (err) {
      console.error("Error saving completion state:", err);
      alert("Failed to save completion status. Please try again.");
    } finally {
      setCompletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 px-4 md:px-8 py-10 antialiased">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-indigo-600" /> Your Enrolled Courses
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Track, manage, and verify your ongoing educational milestones.
            </p>
          </div>
          <div className="text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-1.5 self-start md:self-auto shadow-sm">
            Active Student: <span className="text-slate-800 font-semibold">{user?.email}</span>
          </div>
        </div>

        {/* LOADING STATE REFACTORED TO SPINNER */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            <p className="text-sm font-medium text-slate-500">Syncing with registration data...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl max-w-xl mx-auto flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && enrollData.length === 0 && !error && (
          <div className="bg-white border border-slate-200 border-dashed rounded-2xl p-12 text-center max-w-md mx-auto shadow-sm space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-semibold text-slate-800">No active enrollments</h3>
            <p className="text-xs text-slate-500 leading-normal">
              You haven’t enrolled in any tracks yet. Explore the catalog to begin your journey.
            </p>
          </div>
        )}

        {/* GRID LAYOUT CONTAINING INTERACTIVE COMPONENTS */}
        {!loading && enrollData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrollData.map((course) => (
              <div 
                key={course._id} 
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md flex flex-col justify-between space-y-4 relative overflow-hidden group"
              >
                {/* Embedded Card Content Component */}
                <div className="flex-1">
                  <EnrolledCourseCard data={course} />
                </div>

                {/* Interactive Dynamic Completion Action Bar */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                  <button
                    disabled={completingId === course._id}
                    onClick={() => handleMarkComplete(course)}
                    className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white disabled:text-slate-500 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98]"
                  >
                    {completingId === course._id ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Saving Progress...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/10" />
                        Mark Complete
                      </>
                    )}
                  </button>

                  
                
                  
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyEnrolledCourse;