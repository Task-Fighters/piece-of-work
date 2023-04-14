import React from 'react';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const items = [
  { label: 'Home', href: '/home' },
  { label: 'Groups', href: '/groups' },
  { label: 'Users', href: '/users' },
  { label: 'Assignments', href: '/assignments' },
  { label: 'Profile', href: '/profile' }
];

const Home = () => {
  return (
    <div className="container-xl">
      <Header items={items} />
      <div className="flex justify-center">
        <div className="max-w-6xl mx-2">
          <div className="float-right">
            <div className="w-48">
              <Button
                buttonColor="white"
                label="Add new Assignment"
                onClick={() => {}}
              />
            </div>
          </div>
          <Input icon placeholder="Search" />
          <Card
            cardType="feature"
            featured="Background

A newly started flight booker company needs your help, and they need it quickly! They’re supposed to publish their application and business within two weeks but haven't even gotten started on the booking-page itself. They have the frontend part under control, that’s for an external consultant to fix for them, but they need you to fix the backend! The requirements won’t tell you everything, some of the parts of the backend you’ll have to figure out yourself!
 
Purpose

After this week you’ll have gained a lot of experience in backend database handling as well as setting up proper API routes as well as a fully functioning API prototype which can be shown on your portfolio. You’ll also have gained familiarity with creating an API for a frontend someone else is making. 

Remember to hand it in by 18:00 on Friday and send it to pgp-submit@appliedtechnology.se

And as always, we’ll send out a form on Friday to hear with everyone how it went. If anyone had a really hard time with this test we will see what we can do to help 🙂
"
            limitText={300}
            onClick={() => {}}
            subtitle="12-03-2023"
            title="Flight Finder v2 - Week 2"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
