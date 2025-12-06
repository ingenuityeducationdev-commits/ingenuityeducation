export const siteContent = {
  // Hero Section
  // Josiah, You can edit all the text on this page, happy editing
  hero: {
    title: {
      main: "Innovative Learning Solutions.",
      highlight: "Conquer HSC English"
    },
    subtitle: "Expert-led HSC English tutoring with personalised support, small classes, and results-driven teaching designed to build confidence and high performance.",
    stats: {
      atar: {
        value: "99.5+",
        label: "Average ATAR"
      },
      classSize: {
        value: "6",
        label: "Max Class Size"
      },
      students: {
        value: "500+",
        label: "Students Taught"
      },
      experience: {
        value: "15+",
        label: "Years Experience"
      }
    }
  },

  // Teachers Section
  teachers: {
    heading: "Learn From The Best",
    subheading: "Our teachers are more than educators—they're mentors who've achieved exceptional results and are passionate about helping you succeed.",
    // Note to Josiah: Teacher profiles (name, title, qualifications, bio, ATAR score, specialisations)
    // are stored in the Supabase database 'teachers' table and can be edited there.
    // To edit teacher information, use the Supabase dashboard or database tools.
    // Image URLs: Add image URLs below for teacher profile photos
    imageUrls: {
      // Add teacher image URLs here using teacher ID or name as key
      // Example: "1": "https://example.com/teacher1.jpg"
      "Josiah Prasad": "https://i.imghippo.com/files/mlba4229oPc.JPG",
      "Joshua Christopher": "https://i.imghippo.com/files/LAii3437xNY.JPG"
    },
    list: [
      {
        name: "Josiah Prasad",
        title: "Accelerated Law Student @ The University of New England",
        qualifications: "2023 Baulkham Hills Graduate",
        bio: "Josiah is a well-known English tutor who specialises in complex English needs, supporting high-achievers and those who struggle to grasp that special skill of NSW English. He has a proven track record of State Rank achieving students, and has helped numerous students personally to achieve their English goals.",
        atar_score: "99.95",
        specializations: ["English Advanced", "English Extension 1", "English Extension 2"],
        display_order: 1
      },
      {
        name: "James Mitchell",
        title: "Senior Mathematics Tutor",
        qualifications: "BSc Mathematics (UNSW), ATAR 99.80",
        bio: "State ranker in Mathematics and passionate about helping students achieve their potential. Known for breaking down difficult problems into simple steps and making complex concepts accessible to all learners.",
        atar_score: "99.80",
        specializations: ["Mathematics Advanced", "Mathematics Extension 1", "Mathematics Extension 2"],
        display_order: 2
      }
    ]
  },

  // Features Section
  features: {
    heading: "Why Choose Us",
    subheading: "We go beyond traditional tutoring to provide a comprehensive learning experience that delivers real results.",
    items: [
      {
        title: "Small Class Sizes",
        description: "Maximum 6-8 students per class ensures personalised attention and tailored support for every learner."
      },
      {
        title: "Exam-Ready Skills",
        description: "Practise essays / short responses under timed conditions to build the precision and control expected in top-band writing."
      },
      {
        title: "24/7 Support",
        description: "Get help when you need it with our dedicated online support community and direct teacher access."
      },
      {
        title: "Comprehensive Resources",
        description: "Premium study materials, practice questions, and exam preparation resources included."
      },
      {
        title: "Proven Results",
        description: "Our students achieve outstanding growth and high improvement, achieving band 6 results"
      },
      {
        title: "Progress Tracking",
        description: "Regular assessments and feedback help monitor improvement and identify areas for growth."
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    heading: "Student Success Stories",
    subheading: "Hear from students who've achieved exceptional results with our guidance and support.",
    reviews: [
      {
        name: "Year 12 Student",
        school: "Baulkham Hills High School",
        quote: "Very conscientious tutor who helped me significantly improve in reading tasks and essay writing. Provides nuanced feedback on essays and also tips for studying English and other subjects in general. Also flexible in terms of rescheduling which is very convenient during exam blocks!"
      },
      {
        name: "Year 10 Student",
        school: "William Clarke College",
        quote: "Josiah was my tutor during year 10, and I was able to excel in my Mathematics 5.3 class thanks to his very personalised, expert and supportive teaching! He has a wealth of knowledge and is talented in making concepts easy to understand, and I would definitely recommend it to any students."
      },
      {
        name: "Year 12 Rank 1 Student",
        school: "Toongabbie Christian College",
        quote: "During Year 11 English I honestly didn't know what I was doing and was getting average results. I did a trial lesson with Josiah for Year 12 content and was impressed with his flexibility and how tailored the lessons were to my needs. Ever since then I was able to come first or second in each assessment and finished as Rank 1 in English Advanced, staying above my cohort by a very large margin."
      },
      {
        name: "Year 10 Student",
        school: "Australian Christian College",
        quote: "Josiah is a very good teacher and he explains problems very well. He is understanding and also lenient and has helped me achieve higher scores in my assessments and tests. He has helped me get a better understanding of things I don't know."
      },
      {
        name: "Year 12 Student",
        school: "Carlingford High School",
        quote: "Josiah is a skilled tutor who explains complex concepts clearly, making them easy to understand. His lessons are also easy to follow, and he's flexible when it comes to adjusting lesson times. He also spends some lessons on revision to ensure his students understand the topics and can perform to their best ability during exams."
      },
      {
        name: "Year 12 Student",
        school: "Toongabbie Christian College",
        quote: "Josiah, unlike many other tutors, did not simply do the work for me and ask me to memorise. He ensured I had a deep understanding of the module and the ideas I wrote about, allowing me to excel even further. His method is top tier and promises excellent results if you are willing to put the effort in."
      }
    ]
  },

  // Courses Section
  courses: {
    heading: "Our English Courses",
    subheading: "Comprehensive programs designed to help you excel in your studies with expert guidance and proven methodologies."
  },

  // Intensives Section
  intensives: {
    badge: "Intensive Programs",
    heading: "Holiday Classes & Intensives",
    subheading: "Accelerate your learning with focused intensive programs designed to boost your skills and confidence during school breaks."
  },

  // Footer
  footer: {
    tagline: "Empowering students to achieve academic excellence through personalized tutoring and expert guidance.",
    contact: {
      email: "ingenuityeducation.dev@gmail.com",
      phone: "+61 2 3456 7890",
      address: "Sydney, NSW 2000"
    },
    newsletter: {
      heading: "Stay updated with our newsletter",
      placeholder: "Your email",
      button: "Join"
    },
    copyright: "Ingenuity Education. All rights reserved.",
    links: {
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      refund: "Refund Policy"
    }
  },

  // Contact Section
  contact: {
    heading: "Get In Touch",
    subheading: "Have questions or ready to start your learning journey? We're here to help and typically respond within 24 hours.",
    info: {
      email: "ingenuityeducation.dev@gmail.com",
      phone: "+61 2 1234 5678",
      whatsapp: "+61412345678",
      address: {
        suburb: "Sydney",
        state: "NSW",
        postcode: "2000",
        full: "Sydney, NSW 2000"
      },
      hours: {
        weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
        weekends: "Saturday: 10:00 AM - 4:00 PM",
        closed: "Sunday: Closed"
      }
    },
    form: {
      title: "Send Us a Message",
      description: "Fill out the form below and we'll get back to you as soon as possible.",
      subjects: [
        "General Inquiry",
        "Course Information",
        "Enrollment Questions",
        "Pricing & Payment",
        "Schedule & Availability",
        "Other"
      ]
    },
    social: {
      facebook: "https://facebook.com/ingenuityeducation",
      instagram: "https://instagram.com/ingenuityeducation",
      linkedin: "https://linkedin.com/company/ingenuityeducation"
    },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.6394437094904!2d151.20732431521012!3d-33.87365098065035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae401e8b983f%3A0x5017d681632bfc0!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
  }
};
