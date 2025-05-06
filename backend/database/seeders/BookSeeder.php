<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $books = [
            [
                'title' => 'Cien años de soledad',
                'author' => 'Gabriel García Márquez',
                'year' => 1967,
                'content' => <<<'EOD'
                 Little Red Riding Hood
by Leanne Guenther
Once upon a time, there was a little girl who lived in a village near the forest. Whenever she went
out, the little girl wore a red riding cloak, so everyone in the village called her Little Red Riding
Hood. One morning, Little Red Riding Hood’s mother asked her to take some food to her
grandmother, as she had been ill.
So they packed a nice basket for Little Red Riding Hood to take to her grandmother. When the
basket was ready, the little girl put on her red cloak and kissed her mother goodbye.
"Remember, go straight to Grandma's house," her mother cautioned.
"Don't dawdle along the way and please don't talk to strangers! The woods are dangerous."
"Don't worry, mommy," said Little Red Riding Hood, "I'll be careful."
But when Little Red Riding Hood noticed some lovely flowers in the woods, she forgot her promise to her mother. She
picked a few, watched the butterflies flit about for awhile, listened to the frogs croaking and then picked a few more. Little
Red Riding Hood was enjoying the warm summer day so much, that she didn't notice a dark shadow approaching out of the
forest behind her...
Suddenly, the wolf appeared beside her.
"What are you doing out here, little girl and where are you going?" the wolf asked in a voice as friendly as he could muster.
"I'm on my way to see my Grandma who lives through the forest, near the brook," Little Red Riding Hood replied.
Then she realized how late she was and quickly excused herself, rushing down the path to her Grandma's house. The wolf,
in the meantime, took a shortcut...
The wolf, a little out of breath from running, arrived at Grandma's and knocked lightly at the door.
"Oh thank goodness dear. Come in. Come in. I was worried that something had happened to you in the forest," said
Grandma thinking that the knock was her granddaughter.
The wolf let himself in. Poor Granny did not have time to say another word, before the wolf gobbled her up!
The wolf let out a satisfied burp, and then poked through Granny's wardrobe to find a nightgown that he liked. He added a
frilly sleeping cap, and for good measure, dabbed some of Granny's perfume behind his pointy ears.
A few minutes later, Red Riding Hood knocked on the door. The wolf jumped into bed and pulled the covers over his nose.
"Who is it?" he called in a cackly voice.
"It's me, Little Red Riding Hood."
"Oh how lovely! Do come in, my dear," croaked the wolf.
When Little Red Riding Hood entered the little cottage, she could scarcely recognize her Grandmother.
"Grandmother! Your voice sounds so odd. Is something the matter?" she asked.
"Oh, I just have touch of a cold," squeaked the wolf adding a cough at the end to prove the point.
"But Grandmother! What big ears you have," said Little Red Riding Hood as she edged closer to the bed.
"The better to hear you with, my dear," replied the wolf.
"But Grandmother! What big eyes you have," said Little Red Riding Hood.
"The better to see you with, my dear," replied the wolf.
"But Grandmother! What big teeth you have," said Little Red Riding Hood her voice quivering slightly.
"The better to eat you with, my dear," roared the wolf and he leapt out of the bed and began to chase the little girl. Almost
too late, Little Red Riding Hood realized that the person in the bed was not her Grandmother, but a hungry wolf.
She ran across the room and through the door, shouting, "Help! Wolf!" as loudly as she could.
A woodsman who was chopping logs nearby heard her cry and ran towards the cottage as fast as he could.
He grabbed the wolf and cut the poor Grandmother out.
"Oh Grandma, I was so scared!" sobbed Little Red Riding Hood, "I'll never speak to strangers or dawdle in the forest again."
"There, there, child. You have learned an important lesson. Thank goodness you shouted loud enough for this kind
woodsman to hear you!"
The woodsman knocked out the wolf and carried him deep into the forest where he wouldn't bother people any longer.
Little Red Riding Hood and her Grandmother had a nice lunch and a long chat. 
EOD,
                'pages' => 417,
                'synopsis' => 'Una obra maestra del realismo mágico que narra la historia de la familia Buendía.',
                'cover_image' => 'https://example.com/cover1.jpg'
            ],
            [
                'title' => '1984',
                'author' => 'George Orwell',
                'year' => 1949,
                'content' => 'Contenido del libro...',
                'pages' => 328,
                'synopsis' => 'Una distopía sobre un futuro totalitario y la vigilancia extrema.',
                'cover_image' => 'https://example.com/cover2.jpg'
            ],
            [
                'title' => 'El señor de los anillos',
                'author' => 'J.R.R. Tolkien',
                'year' => 1954,
                'content' => 'Contenido del libro...',
                'pages' => 1216,
                'synopsis' => 'Una épica aventura en la Tierra Media para destruir el Anillo Único.',
                'cover_image' => 'https://example.com/cover3.jpg'
            ]
        ];

        foreach ($books as $book) {
            Book::create($book);
        }
    }
}
