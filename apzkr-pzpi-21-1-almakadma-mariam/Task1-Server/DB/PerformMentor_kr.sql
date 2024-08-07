PGDMP                      |           PerformMentor_kr    16.0    16.0 g    |           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            }           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ~           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    33749    PerformMentor_kr    DATABASE     �   CREATE DATABASE "PerformMentor_kr" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Ukrainian_Ukraine.1251';
 "   DROP DATABASE "PerformMentor_kr";
                postgres    false            d           1247    33751    access_status    TYPE     F   CREATE TYPE public.access_status AS ENUM (
    'entry',
    'exit'
);
     DROP TYPE public.access_status;
       public          postgres    false            g           1247    33756    reward_type    TYPE     J   CREATE TYPE public.reward_type AS ENUM (
    'physical',
    'virtual'
);
    DROP TYPE public.reward_type;
       public          postgres    false            j           1247    33762    status_type    TYPE     F   CREATE TYPE public.status_type AS ENUM (
    'user',
    'company'
);
    DROP TYPE public.status_type;
       public          postgres    false            m           1247    33768    task_priority    TYPE     R   CREATE TYPE public.task_priority AS ENUM (
    'low',
    'medium',
    'high'
);
     DROP TYPE public.task_priority;
       public          postgres    false            p           1247    33776    task_status    TYPE     f   CREATE TYPE public.task_status AS ENUM (
    'open',
    'in_progress',
    'closed',
    'frozen'
);
    DROP TYPE public.task_status;
       public          postgres    false            s           1247    33786 	   user_role    TYPE     H   CREATE TYPE public.user_role AS ENUM (
    'employee',
    'manager'
);
    DROP TYPE public.user_role;
       public          postgres    false            �            1259    33796    achievements    TABLE     �   CREATE TABLE public.achievements (
    achievement_id bigint NOT NULL,
    title character varying(255),
    description text,
    date_achieved date,
    points_awarded integer DEFAULT 0,
    user_id bigint
);
     DROP TABLE public.achievements;
       public         heap    postgres    false            �            1259    33802    achievements_achievement_id_seq    SEQUENCE     �   CREATE SEQUENCE public.achievements_achievement_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.achievements_achievement_id_seq;
       public          postgres    false    215            �           0    0    achievements_achievement_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.achievements_achievement_id_seq OWNED BY public.achievements.achievement_id;
          public          postgres    false    216            �            1259    33803     achievements_achievement_id_seq1    SEQUENCE     �   ALTER TABLE public.achievements ALTER COLUMN achievement_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.achievements_achievement_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            �            1259    33809    comments    TABLE     �   CREATE TABLE public.comments (
    comment_id bigint NOT NULL,
    task_id bigint,
    user_id bigint,
    text text,
    created_at date
);
    DROP TABLE public.comments;
       public         heap    postgres    false            �            1259    33814    comments_comment_id_seq    SEQUENCE     �   ALTER TABLE public.comments ALTER COLUMN comment_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.comments_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    33815 	   companies    TABLE     �   CREATE TABLE public.companies (
    company_id bigint NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(255),
    address text,
    created_at date
);
    DROP TABLE public.companies;
       public         heap    postgres    false            �            1259    33820    company_company_id_seq    SEQUENCE     �   CREATE SEQUENCE public.company_company_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.company_company_id_seq;
       public          postgres    false    220            �           0    0    company_company_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.company_company_id_seq OWNED BY public.companies.company_id;
          public          postgres    false    221            �            1259    33821    company_company_id_seq1    SEQUENCE     �   ALTER TABLE public.companies ALTER COLUMN company_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.company_company_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    33822    departments    TABLE     �  CREATE TABLE public.departments (
    department_id bigint NOT NULL,
    name character varying(255),
    description text,
    department_code text,
    contact_person_name character varying(255),
    contact_person_email character varying(255),
    contact_person_phone character varying(255),
    company_id bigint,
    created_at date DEFAULT CURRENT_DATE,
    updated_at date DEFAULT CURRENT_DATE
);
    DROP TABLE public.departments;
       public         heap    postgres    false            �            1259    33829    department_department_id_seq    SEQUENCE     �   CREATE SEQUENCE public.department_department_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.department_department_id_seq;
       public          postgres    false    223            �           0    0    department_department_id_seq    SEQUENCE OWNED BY     ^   ALTER SEQUENCE public.department_department_id_seq OWNED BY public.departments.department_id;
          public          postgres    false    224            �            1259    33830    department_department_id_seq1    SEQUENCE     �   ALTER TABLE public.departments ALTER COLUMN department_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.department_department_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    223            �            1259    33831    rewards    TABLE     �   CREATE TABLE public.rewards (
    reward_id bigint NOT NULL,
    title character varying(255),
    description text,
    points_required integer,
    type public.reward_type,
    company_id bigint
);
    DROP TABLE public.rewards;
       public         heap    postgres    false    871            �            1259    33836    rewards_reward_id_seq    SEQUENCE     �   CREATE SEQUENCE public.rewards_reward_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.rewards_reward_id_seq;
       public          postgres    false    226            �           0    0    rewards_reward_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.rewards_reward_id_seq OWNED BY public.rewards.reward_id;
          public          postgres    false    227            �            1259    33837    rewards_reward_id_seq1    SEQUENCE     �   ALTER TABLE public.rewards ALTER COLUMN reward_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.rewards_reward_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226            �            1259    33856    task_executors    TABLE     e   CREATE TABLE public.task_executors (
    task_id bigint NOT NULL,
    executor_id bigint NOT NULL
);
 "   DROP TABLE public.task_executors;
       public         heap    postgres    false            �            1259    33859    tasks    TABLE     .  CREATE TABLE public.tasks (
    task_id bigint NOT NULL,
    description text,
    deadline date,
    priority public.task_priority DEFAULT 'medium'::public.task_priority,
    status public.task_status DEFAULT 'open'::public.task_status,
    user_id bigint,
    updated_at date,
    created_at date
);
    DROP TABLE public.tasks;
       public         heap    postgres    false    877    880    880    877            �            1259    33866    tasks_task_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tasks_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.tasks_task_id_seq;
       public          postgres    false    230            �           0    0    tasks_task_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.tasks_task_id_seq OWNED BY public.tasks.task_id;
          public          postgres    false    231            �            1259    33867    tasks_task_id_seq1    SEQUENCE     �   ALTER TABLE public.tasks ALTER COLUMN task_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tasks_task_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    230            �            1259    33868    users    TABLE     �  CREATE TABLE public.users (
    user_id bigint NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    email character varying(255),
    password character varying(255),
    role public.user_role DEFAULT 'employee'::public.user_role,
    department_id bigint,
    start_date date DEFAULT CURRENT_DATE,
    updated_at date,
    points integer DEFAULT 0
);
    DROP TABLE public.users;
       public         heap    postgres    false    883    883            �            1259    33876    users_reward    TABLE     �   CREATE TABLE public.users_reward (
    users_reward_id bigint NOT NULL,
    user_id bigint,
    redeemed boolean DEFAULT false,
    reward_id bigint
);
     DROP TABLE public.users_reward;
       public         heap    postgres    false            �            1259    33880     users_reward_users_reward_id_seq    SEQUENCE     �   ALTER TABLE public.users_reward ALTER COLUMN users_reward_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_reward_users_reward_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    234            �            1259    33881    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    233            �           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    236            �            1259    33882    users_user_id_seq1    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    233            �            1259    33883 
   work_hours    TABLE     �  CREATE TABLE public.work_hours (
    work_hours_id bigint NOT NULL,
    user_id bigint,
    date date,
    start_time time without time zone,
    end_time time without time zone,
    break_start_time time without time zone,
    total_overtime_minutes double precision DEFAULT 0,
    break_end_time time without time zone,
    total_break_duration_minutes double precision,
    total_work_duration_minutes double precision
);
    DROP TABLE public.work_hours;
       public         heap    postgres    false            �            1259    33887    work_hours_settings    TABLE     �   CREATE TABLE public.work_hours_settings (
    setting_id bigint NOT NULL,
    company_id bigint,
    max_overtime_hours_per_day double precision,
    work_days_per_month integer,
    hours_per_day double precision
);
 '   DROP TABLE public.work_hours_settings;
       public         heap    postgres    false            �            1259    33890 "   work_hours_settings_setting_id_seq    SEQUENCE     �   CREATE SEQUENCE public.work_hours_settings_setting_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.work_hours_settings_setting_id_seq;
       public          postgres    false    239            �           0    0 "   work_hours_settings_setting_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.work_hours_settings_setting_id_seq OWNED BY public.work_hours_settings.setting_id;
          public          postgres    false    240            �            1259    33891 #   work_hours_settings_setting_id_seq1    SEQUENCE     �   ALTER TABLE public.work_hours_settings ALTER COLUMN setting_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.work_hours_settings_setting_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    239            �            1259    33892    work_hours_work_hours_id_seq    SEQUENCE     �   CREATE SEQUENCE public.work_hours_work_hours_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.work_hours_work_hours_id_seq;
       public          postgres    false    238            �           0    0    work_hours_work_hours_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.work_hours_work_hours_id_seq OWNED BY public.work_hours.work_hours_id;
          public          postgres    false    242            �            1259    33893    work_hours_work_hours_id_seq1    SEQUENCE     �   ALTER TABLE public.work_hours ALTER COLUMN work_hours_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.work_hours_work_hours_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    238            ]          0    33796    achievements 
   TABLE DATA           r   COPY public.achievements (achievement_id, title, description, date_achieved, points_awarded, user_id) FROM stdin;
    public          postgres    false    215   �}       `          0    33809    comments 
   TABLE DATA           R   COPY public.comments (comment_id, task_id, user_id, text, created_at) FROM stdin;
    public          postgres    false    218   �~       b          0    33815 	   companies 
   TABLE DATA           [   COPY public.companies (company_id, name, email, password, address, created_at) FROM stdin;
    public          postgres    false    220   �       e          0    33822    departments 
   TABLE DATA           �   COPY public.departments (department_id, name, description, department_code, contact_person_name, contact_person_email, contact_person_phone, company_id, created_at, updated_at) FROM stdin;
    public          postgres    false    223   
�       h          0    33831    rewards 
   TABLE DATA           c   COPY public.rewards (reward_id, title, description, points_required, type, company_id) FROM stdin;
    public          postgres    false    226   r�       k          0    33856    task_executors 
   TABLE DATA           >   COPY public.task_executors (task_id, executor_id) FROM stdin;
    public          postgres    false    229   ��       l          0    33859    tasks 
   TABLE DATA           r   COPY public.tasks (task_id, description, deadline, priority, status, user_id, updated_at, created_at) FROM stdin;
    public          postgres    false    230   ̈́       o          0    33868    users 
   TABLE DATA           �   COPY public.users (user_id, first_name, last_name, email, password, role, department_id, start_date, updated_at, points) FROM stdin;
    public          postgres    false    233   $�       p          0    33876    users_reward 
   TABLE DATA           U   COPY public.users_reward (users_reward_id, user_id, redeemed, reward_id) FROM stdin;
    public          postgres    false    234   z�       t          0    33883 
   work_hours 
   TABLE DATA           �   COPY public.work_hours (work_hours_id, user_id, date, start_time, end_time, break_start_time, total_overtime_minutes, break_end_time, total_break_duration_minutes, total_work_duration_minutes) FROM stdin;
    public          postgres    false    238   Ɖ       u          0    33887    work_hours_settings 
   TABLE DATA           �   COPY public.work_hours_settings (setting_id, company_id, max_overtime_hours_per_day, work_days_per_month, hours_per_day) FROM stdin;
    public          postgres    false    239   Ί       �           0    0    achievements_achievement_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.achievements_achievement_id_seq', 1, false);
          public          postgres    false    216            �           0    0     achievements_achievement_id_seq1    SEQUENCE SET     O   SELECT pg_catalog.setval('public.achievements_achievement_id_seq1', 20, true);
          public          postgres    false    217            �           0    0    comments_comment_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.comments_comment_id_seq', 34, true);
          public          postgres    false    219            �           0    0    company_company_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.company_company_id_seq', 1, false);
          public          postgres    false    221            �           0    0    company_company_id_seq1    SEQUENCE SET     F   SELECT pg_catalog.setval('public.company_company_id_seq1', 15, true);
          public          postgres    false    222            �           0    0    department_department_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.department_department_id_seq', 1, false);
          public          postgres    false    224            �           0    0    department_department_id_seq1    SEQUENCE SET     L   SELECT pg_catalog.setval('public.department_department_id_seq1', 31, true);
          public          postgres    false    225            �           0    0    rewards_reward_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.rewards_reward_id_seq', 1, false);
          public          postgres    false    227            �           0    0    rewards_reward_id_seq1    SEQUENCE SET     E   SELECT pg_catalog.setval('public.rewards_reward_id_seq1', 21, true);
          public          postgres    false    228            �           0    0    tasks_task_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.tasks_task_id_seq', 1, false);
          public          postgres    false    231            �           0    0    tasks_task_id_seq1    SEQUENCE SET     A   SELECT pg_catalog.setval('public.tasks_task_id_seq1', 16, true);
          public          postgres    false    232            �           0    0     users_reward_users_reward_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.users_reward_users_reward_id_seq', 27, true);
          public          postgres    false    235            �           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);
          public          postgres    false    236            �           0    0    users_user_id_seq1    SEQUENCE SET     A   SELECT pg_catalog.setval('public.users_user_id_seq1', 32, true);
          public          postgres    false    237            �           0    0 "   work_hours_settings_setting_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.work_hours_settings_setting_id_seq', 1, false);
          public          postgres    false    240            �           0    0 #   work_hours_settings_setting_id_seq1    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.work_hours_settings_setting_id_seq1', 5, true);
          public          postgres    false    241            �           0    0    work_hours_work_hours_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.work_hours_work_hours_id_seq', 1, false);
          public          postgres    false    242            �           0    0    work_hours_work_hours_id_seq1    SEQUENCE SET     L   SELECT pg_catalog.setval('public.work_hours_work_hours_id_seq1', 26, true);
          public          postgres    false    243            �           2606    33897    achievements achievements_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.achievements
    ADD CONSTRAINT achievements_pkey PRIMARY KEY (achievement_id);
 H   ALTER TABLE ONLY public.achievements DROP CONSTRAINT achievements_pkey;
       public            postgres    false    215            �           2606    33901    comments comments_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public            postgres    false    218            �           2606    33903    companies company_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.companies
    ADD CONSTRAINT company_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public.companies DROP CONSTRAINT company_email_key;
       public            postgres    false    220            �           2606    33905    companies company_name_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.companies
    ADD CONSTRAINT company_name_key UNIQUE (name);
 D   ALTER TABLE ONLY public.companies DROP CONSTRAINT company_name_key;
       public            postgres    false    220            �           2606    33907    companies company_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.companies
    ADD CONSTRAINT company_pkey PRIMARY KEY (company_id);
 @   ALTER TABLE ONLY public.companies DROP CONSTRAINT company_pkey;
       public            postgres    false    220            �           2606    33909    departments department_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.departments
    ADD CONSTRAINT department_pkey PRIMARY KEY (department_id);
 E   ALTER TABLE ONLY public.departments DROP CONSTRAINT department_pkey;
       public            postgres    false    223            �           2606    33911    rewards rewards_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.rewards
    ADD CONSTRAINT rewards_pkey PRIMARY KEY (reward_id);
 >   ALTER TABLE ONLY public.rewards DROP CONSTRAINT rewards_pkey;
       public            postgres    false    226            �           2606    33919 "   task_executors task_executors_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.task_executors
    ADD CONSTRAINT task_executors_pkey PRIMARY KEY (task_id, executor_id);
 L   ALTER TABLE ONLY public.task_executors DROP CONSTRAINT task_executors_pkey;
       public            postgres    false    229    229            �           2606    33921    tasks tasks_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (task_id);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public            postgres    false    230            �           2606    33923    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    233            �           2606    33925    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    233            �           2606    33927    users_reward users_reward_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.users_reward
    ADD CONSTRAINT users_reward_pkey PRIMARY KEY (users_reward_id);
 H   ALTER TABLE ONLY public.users_reward DROP CONSTRAINT users_reward_pkey;
       public            postgres    false    234            �           2606    33929    work_hours work_hours_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.work_hours
    ADD CONSTRAINT work_hours_pkey PRIMARY KEY (work_hours_id);
 D   ALTER TABLE ONLY public.work_hours DROP CONSTRAINT work_hours_pkey;
       public            postgres    false    238            �           2606    33931 ,   work_hours_settings work_hours_settings_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.work_hours_settings
    ADD CONSTRAINT work_hours_settings_pkey PRIMARY KEY (setting_id);
 V   ALTER TABLE ONLY public.work_hours_settings DROP CONSTRAINT work_hours_settings_pkey;
       public            postgres    false    239            �           2606    33942 &   achievements achievements_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.achievements
    ADD CONSTRAINT achievements_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 P   ALTER TABLE ONLY public.achievements DROP CONSTRAINT achievements_user_id_fkey;
       public          postgres    false    215    233    4794            �           2606    33952    rewards company_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.rewards
    ADD CONSTRAINT company_id FOREIGN KEY (company_id) REFERENCES public.companies(company_id) NOT VALID;
 <   ALTER TABLE ONLY public.rewards DROP CONSTRAINT company_id;
       public          postgres    false    220    4782    226            �           2606    33972 &   departments department_company_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.departments
    ADD CONSTRAINT department_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(company_id);
 P   ALTER TABLE ONLY public.departments DROP CONSTRAINT department_company_id_fkey;
       public          postgres    false    223    220    4782            �           2606    33977    users_reward reward_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.users_reward
    ADD CONSTRAINT reward_id FOREIGN KEY (reward_id) REFERENCES public.rewards(reward_id) NOT VALID;
 @   ALTER TABLE ONLY public.users_reward DROP CONSTRAINT reward_id;
       public          postgres    false    226    234    4786            �           2606    33982 .   task_executors task_executors_executor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.task_executors
    ADD CONSTRAINT task_executors_executor_id_fkey FOREIGN KEY (executor_id) REFERENCES public.users(user_id);
 X   ALTER TABLE ONLY public.task_executors DROP CONSTRAINT task_executors_executor_id_fkey;
       public          postgres    false    229    4794    233            �           2606    33987 *   task_executors task_executors_task_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.task_executors
    ADD CONSTRAINT task_executors_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks(task_id);
 T   ALTER TABLE ONLY public.task_executors DROP CONSTRAINT task_executors_task_id_fkey;
       public          postgres    false    229    230    4790            �           2606    33992    comments task_id    FK CONSTRAINT     t   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT task_id FOREIGN KEY (task_id) REFERENCES public.tasks(task_id);
 :   ALTER TABLE ONLY public.comments DROP CONSTRAINT task_id;
       public          postgres    false    4790    218    230            �           2606    33997    tasks tasks_owner_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_owner_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 C   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_owner_id_fkey;
       public          postgres    false    4794    230    233            �           2606    34002    comments user_id    FK CONSTRAINT     t   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 :   ALTER TABLE ONLY public.comments DROP CONSTRAINT user_id;
       public          postgres    false    218    4794    233            �           2606    34007    users_reward user_id    FK CONSTRAINT     x   ALTER TABLE ONLY public.users_reward
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 >   ALTER TABLE ONLY public.users_reward DROP CONSTRAINT user_id;
       public          postgres    false    4794    234    233            �           2606    34012    users users_department_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(department_id);
 H   ALTER TABLE ONLY public.users DROP CONSTRAINT users_department_id_fkey;
       public          postgres    false    223    233    4784            �           2606    34022 7   work_hours_settings work_hours_settings_company_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.work_hours_settings
    ADD CONSTRAINT work_hours_settings_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(company_id);
 a   ALTER TABLE ONLY public.work_hours_settings DROP CONSTRAINT work_hours_settings_company_id_fkey;
       public          postgres    false    239    4782    220            �           2606    34027 "   work_hours work_hours_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.work_hours
    ADD CONSTRAINT work_hours_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 L   ALTER TABLE ONLY public.work_hours DROP CONSTRAINT work_hours_user_id_fkey;
       public          postgres    false    4794    233    238            ]   �   x����n�0���S����;�:i�Q����VYa����*���Q���'��l�}�8��o�R:z�Ǳ,e���*/��@E#EEmMC�H5Z��a�R0ȷ��~��W�*��c�!hL7"3f�O��}$��E�ɝ�T�#'�;�^������gi0��r���'yu~] ?�W�ʀb����-ͯ��J�ut>W�T�*��^
G�����k��%4/�I�}ɷ��L��|��_�2�R���w��	���      `   �   x�m�K�0����@����=����vQ?ׯ�T(�Wog�����2:���l�u��8	�E�2q�=�����F����4jF�Zsٸ!q��Z�-hI"��>�>� !/U�_�Q��,ݯy�!}�!-�6ɲ�ˉ�>�/R      b   x  x���͒�@ �����E���������Q` �y�<E�F��&n�1U=S=s�����м�����3}c7:�^�~�����{^�3�V�x5,�ޕC�u���@+m<w|L��e�.��E�cx�^9�r���K��K�c� �Js�K}T����tд��C�~���At��,��Z��wJ-yA��hu��dr�D�}(�3hF�ډ���֝|0�l��PP��+�du���;�Ph�B�W^` w�~5�bf`�꾺B4�%�j<�O=��5Nj�^�tk�n�n4�����_;���A��[�5v� O.[�������Ҙ�͊�%�8�W�Lz$�׹���[?.��ͯ�? ;Meש�J��ŀL�6��"����L�Z���v
��]+K��8٠��<�o-Qx4��@t��~\��70�&��^^���[ۤ�U��R�T��N�d&��ȯ���.z�*壤�+���C� �!�C��?��լ2cckH0v��ޢK�m�,�u4���u�m烘Lr.eu/����a���U+!A	�p���hJ�1{E|น�9Z�:,X�I��׺/{�l��or�E>��i<�����K������Q�Oxޤ��$�e�7��C�      e   X  x����JA��٧��B.�םI'Xkc�#^q�%"�hg"��Qh���1&���+̾��������2����?����4�,?�GۥA	e�VY��8�	ǁ{�!���Ǯ�q�'X�B[Jq� ����>.�&��^����*��ϒJ��yr]�**�L�q��\��k�JT~���|�'��F�P�?��g(8heY��6�v�jz�2�L>�Z�q|%��u�27�S�5E���3��hI
�����/9f7&�|�F�K�U3�#N��w�	c	�˵��c�X$��'�am9U8��iOpVrs��3a�W�	P[�fF��L�߆˅��u��X���+��o(�-y      h     x��P�N�0��������
ѓ�Ȓ�/j�T�ۧ�=i�xBBL"�|���
���kg:��5 �=rn/�^3%���5Sb�د;�X0�ȓ� E	��2�tl��?Wl2F"�a������T�m_�8;(%���bV���'k�>�����ڰ�/ ��5^��L+��s$�S��ީ%�u�iK�\W�l4jF=,��V�%��MN��lJȧ#��>ÕRk!��H�s�R�b73���*���Q�+H�q/�����      k   6   x��A 1A��a&��J�����lx�_��v*�7�1�7{trp�����      l   G  x��RKN�0]ۧ���M�Xw��.Jc�qIb+v���*P��s#���T�J���h�͛y3���9��J,Y��W
�� �x��c/��/2 $+9��p �#����t[��B1
p���'I�(҉zA����RsQ��x[��g+fQ1�l��x�ۡd&V=ܡ���
�9Z)^.����U�x�s8><�dٞ%�y��GY �a�۵٘�}72���|��������o�+�t3���u0"��k9� �\�䐏��|H_oT�u����>ث�Lv�eJ��z~t����3uLV���Bmg�o`�=��B�L���      o   F  x���ˎ�F���s�v�P0��`c0�b�5����j.�*�E �,�����F�%�@�����nG��,�EQ�:�����=t���5�MH�#%>F���}��w�>å�<�F��eF=�� $����'-�rm�[ݜ嗬98O}�p�ޑ0 Ѩ������-v(����0pv5�Λ��޽�t&��l��P�t3�}�(�~������L�Z������]H�Lx&����/HS���ǧէ��ߪ?���T?>�T���D/�0�M��=�����DGg�]��!���K��D6��/K�Hhs�c㗮���M!lqr=_/��TLѥ,�_z�9��e/U��z
㡲�d��������H���i��fo��)($�R`y�\	^�$��h��)z<��g1�Άd�M:S�fC�u:2W��a��)�ɗU(�^��зX�C��ښ�9�`�D䔄����c�Qw|2ƹ�Pn�u�%+�Vȉڅ2^�<�b�<��X�y?(��	�@
6qr��k��gn�&ɤ�z��,|�0�d����U�
\KX&��i$�AGd6&W�E��)F կ���y��O ��:���(=�T�gE���` /p֓J�r�)��U��b2u�}z�v�h��a�Z�����*��/���ؓp��X�,�1�s8���9l7HQLVU��""C6��E}H��ܠIЍ=�J�S��������+��7ZC��ţ�ֈ9$�]ف(�ff`�ƫ��?��t�=���/в��Eo,5^��o�0/M��p����?x�~CH�
h��#��J��}��)iX��-r,�R�KV5      p   <   x�-��  ��d�E��P3�8�,�2֨�HU�c:�#�g]y�N%X�a�#���c�      t   �   x�MPۍ�0��w�A��v4�M���8�M{�QH�"RLL-:�YfeW���n�V~������7淔e��8@+��{�ǒu�����A�{����{����[�x4������u+�O1��ǒ4da�]��$�"�V��uj`h~�|�o[p�6���8@�;�󷟜����ܻJ�Z�;�e�Xgn	V�εܰ@q~��j5���7/��.7Tb�Ly6�B�bQ�K���~@�~�{	��-����]q]      u   6   x�-�I 0���L�\4� �q4����0wRI�}[�Q�a�<D��+��� ��     