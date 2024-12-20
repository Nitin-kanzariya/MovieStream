// import React from "react";
// import { Film, Heart, Users, Code, Github, Twitter } from "lucide-react";
// import rushi from "../../assets/Group-member/Rushi.jpeg";
// import darshak from "../../assets/Group-member/Darshak.jpeg";
// import jyot from "../../assets/Group-member/Jyot.jpeg";
// import ragan from "../../assets/Group-member/ragan.webp";
// import nitin from "../../assets/Group-member/Nitin.jpg";
// import rishi from "../../assets/Group-member/Rishi.jpg";
// import kishan from "../../assets/Group-member/Kishan.jpg";
// import sahil from "../../assets/Group-member/sahil.jpeg";
// import sarjil from "../../assets/Group-member/sarjil.jpeg";
// import girish from "../../assets/Group-member/girish.jpeg";

// const techStack = [
//   { name: "React", iconSrc: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
//   { name: "JavaScript", iconSrc: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" },
//   { name: "Tailwind CSS", iconSrc: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
//   { name: "Node.js", iconSrc: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
//   { name: "MongoDB", iconSrc: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" },
//   { name: "Cloudinary", iconSrc: "https://res.cloudinary.com/demo/image/upload/cloudinary_logo.png" },
// ];

// function About() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
//       {/* Hero Section */}
//       <div className="container mx-auto px-6 py-20">
//         <div className="text-center mb-16">
//           <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text animate-pulse">
//             About Us
//           </h1>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             We're passionate about bringing you the best entertainment experience
//             right at your fingertips. Our goal is to provide you with a platform
//             that offers a vast collection of movies, TV shows, and documentaries.
//           </p>
//         </div>

//         {/* Features Grid */}
//         <div className="grid md:grid-cols-3 gap-8 mb-20">
//           <FeatureCard
//             icon={<Film className="w-10 h-10 text-purple-400" />}
//             title="Vast Library"
//             description="Access to millions of movies and TV shows, complete with detailed information and ratings"
//           />
//           <FeatureCard
//             icon={<Heart className="w-10 h-10 text-pink-400" />}
//             title="Personalized"
//             description="Stream and enjoy movies from your favorite platforms, tailored to your preferences and viewing habits"
//           />
//           <FeatureCard
//             icon={<Users className="w-10 h-10 text-blue-400" />}
//             title="Community"
//             description="Join discussions, share reviews, and connect with other movie enthusiasts"
//           />
//         </div>

//         {/* Team Section */}
//         <div className="mb-20">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             Meet Our Team
//           </h2>
//           <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
//             <TeamMember image={darshak} name="Darshak Kukadiya" />
//             <TeamMember image={kishan} name="Kishan Patel" />
//             <TeamMember image={nitin} name="Nitin Kanzariya" />
//             <TeamMember image={rushi} name="Rushi Makadiya" />
//             <TeamMember image={jyot} name="Jyot Vasava" />
//             <TeamMember image={rishi} name="Rishi Godhasara" />
//             <TeamMember image={ragan} name="Ragan Patel" />
//             <TeamMember image={sarjil} name="Sarjil Chauhan" />
//             <TeamMember image={sahil} name="Sahil Pandavadara" />
//           </div>
//           <div className="flex justify-center mt-10">
//             <TeamMember image={girish} name="Girish Reddy" />
//           </div>
//         </div>

//         {/* Tech Stack */}
//         <div className="mb-20">
//           <h2 className="text-3xl font-bold text-center mb-12">Built With Modern Tech</h2>
//           <div className="flex flex-wrap justify-center gap-6">
//             {techStack.map((tech) => (
//               <TechItem key={tech.name} iconSrc={tech.iconSrc} name={tech.name} />
//             ))}
//           </div>
//         </div>

        // {/* Footer */}
        // <footer className="text-center text-gray-400">
        //   <div className="flex justify-center gap-6 mb-8">
        //     <a href="#" className="hover:text-purple-400 transition-colors">
        //       <Github className="w-8 h-8" />
        //     </a>
        //     <a href="#" className="hover:text-blue-400 transition-colors">
        //       <Twitter className="w-8 h-8" />
        //     </a>
        //   </div>
        //   <p>© All rights reserved.</p>
        // </footer>
//       </div>
//     </div>
//   );
// }

// function FeatureCard({ icon, title, description }) {
//   return (
//     <div className="bg-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
//       <div className="mb-4">{icon}</div>
//       <h3 className="text-xl font-semibold mb-2">{title}</h3>
//       <p className="text-gray-400">{description}</p>
//     </div>
//   );
// }

// function TeamMember({ image, name, role }) {
//   return (
//     <div className="text-center transform hover:scale-105 transition-transform duration-300">
//       <img
//         src={image}
//         alt={name}
//         className="w-40 h-40 rounded-full mx-auto mb-4 object-cover border-4 border-purple-600 shadow-lg"
//       />
//       <h3 className="text-lg font-bold">{name}</h3>
//       <p className="text-gray-400">{role}</p>
//     </div>
//   );
// }

// function TechItem({ iconSrc, name }) {
//   return (
//     <div className="flex items-center gap-2 bg-gray-800 px-5 py-3 rounded-full shadow-md hover:shadow-lg hover:border hover:border-purple-400 transition-all duration-300">
//       <img src={iconSrc} alt={name} className="w-8 h-8" />
//       <span className="text-white">{name}</span>
//     </div>
//   );
// }



// export default About;


import React from "react";
import Footer from "./Footer";
import {
  Film,
  Clapperboard,
  Trophy,
  Star,
  Tv,
  Users,
  Popcorn,
  Globe,
  Shield,
  Heart,
  MessageSquare,
  Github,
  Linkedin,
} from "lucide-react";


const techStack = [
  { name: "React", iconSrc: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { name: "JavaScript", iconSrc: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" },
  { name: "Tailwind CSS", iconSrc: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
  { name: "Node.js", iconSrc: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
  { name: "MongoDB", iconSrc: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" },
  { name: "Cloudinary", iconSrc: "https://res.cloudinary.com/demo/image/upload/cloudinary_logo.png" },
];
const features = [
  {
    icon: <Film className="w-10 h-10 text-purple-400" />,
    title: "Extensive Collection",
    description:
      "Access thousands of movies across all genres, from classic films to the latest blockbusters",
  },
  {
    icon: <Clapperboard className="w-10 h-10 text-pink-400" />,
    title: "High Quality Streaming",
    description:
      "Enjoy crystal-clear HD and 4K streaming with optimized playback technology",
  },
  {
    icon: <Trophy className="w-10 h-10 text-yellow-400" />,
    title: "Award Winners",
    description:
      "Explore curated collections of award-winning films from around the world",
  },
  {
    icon: <Star className="w-10 h-10 text-blue-400" />,
    title: "Personalized Experience",
    description:
      "Get tailored recommendations based on your viewing preferences and history",
  },
  {
    icon: <Tv className="w-10 h-10 text-green-400" />,
    title: "Multi-device Access",
    description:
      "Watch seamlessly across all your devices - TV, laptop, tablet, or phone",
  },
  {
    icon: <Users className="w-10 h-10 text-red-400" />,
    title: "Community Reviews",
    description:
      "Share your thoughts and read authentic reviews from fellow movie enthusiasts",
  },
];

const statistics = [
  { icon: <Film className="w-6 h-6" />, value: "50+", label: "Movies" },
  { icon: <Users className="w-6 h-6" />, value: "100+", label: "Active Users" },
  // { icon: <Star className="w-6 h-6" />, value: "7", label: "Average Rating" },
  { icon: <Heart className="w-6 h-6" />, value: "50+", label: "Favorites" },

  {
    icon: <MessageSquare className="w-6 h-6" />,
    value: "100+",
    label: "Reviews",
  },
];

function About() {
  return (
    <div className="px-[110px]  bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Your Gateway to Cinema
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Welcome to the future of movie streaming. We're passionate about
            bringing the magic of cinema directly to your screen, offering an
            unparalleled collection of films from around the globe.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
          {statistics.map((stat, index) => (
            <StatisticCard key={index} {...stat} />
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gray-800 rounded-xl p-10 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <Popcorn className="w-16 h-16 mx-auto mb-6 text-purple-400" />
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              We believe in the power of storytelling through cinema. Our
              mission is to make quality entertainment accessible to everyone,
              everywhere. We curate the best content from around the world,
              ensuring that every viewer finds something they love.
            </p>
          </div>
        </div>

        {/* Quality Promise */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-gray-800 rounded-xl p-8">
            <Shield className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Quality Promise</h3>
            <p className="text-gray-300">
              We maintain the highest standards of video and audio quality. Our
              platform uses advanced streaming technology to ensure smooth
              playback and crystal-clear picture quality.
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-8">
            <Globe className="w-12 h-12 text-pink-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Global Reach</h3>
            <p className="text-gray-300">
              From Hollywood blockbusters to independent international films, we
              bring diverse content from every corner of the world to your
              screen.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Built With Modern Tech
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {techStack.map((tech) => (
              <TechItem
                key={tech.name}
                iconSrc={tech.iconSrc}
                name={tech.name}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-400">
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://github.com/Nitin-kanzariya"
              className="hover:text-purple-400 transition-colors"
            >
              <Github className="w-8 h-8" />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Linkedin className="w-8 h-8" />
            </a>
          </div>
          <p>© 2024 MovieStream. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function StatisticCard({ icon, value, label }) {
  return (
    <div className="text-center p-6 bg-gray-800 rounded-xl transform hover:scale-105 transition-transform duration-300">
      <div className="flex justify-center mb-3">{icon}</div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}

export default About;

function TechItem({ iconSrc, name }) {
  return (
    <div className="flex items-center gap-2 bg-gray-800 px-5 py-3 rounded-full shadow-md hover:shadow-lg hover:border hover:border-purple-400 transition-all duration-300">
      <img src={iconSrc} alt={name} className="w-8 h-8" />
      <span className="text-white">{name}</span>
    </div>
  );
}