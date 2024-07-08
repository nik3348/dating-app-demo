import { faker } from "@faker-js/faker";

faker.seed(123);

export const generateUsers = (count) => {
  const users = [];
  const universities = ["MIT", "Harvard", "Stanford", "Berkeley", "Caltech"];
  const interests = [
    "Reading",
    "Traveling",
    "Cooking",
    "Sports",
    "Music",
    "Gaming",
    "Hiking",
    "Photography",
  ];

  for (let i = 0; i < count; i++) {
    const id = faker.string.uuid();
    const username = faker.internet.userName();
    const password = faker.internet.password();
    const name = faker.person.fullName();
    const profilePicture = faker.image.avatar();
    const gender = faker.person.gender();
    const age = faker.number.int({ min: 18, max: 30 });
    const location = faker.location.city();
    const university = faker.helpers.arrayElement(universities, 1);
    const userInterests = faker.helpers.arrayElements(
      interests,
      faker.number.int({ min: 1, max: 4 })
    );
    const swipes = [];

    users.push({
      id,
      username,
      password,
      name,
      profilePicture,
      gender,
      age,
      location,
      university,
      interests: userInterests,
      swipes,
    });
  }

  return users;
};
