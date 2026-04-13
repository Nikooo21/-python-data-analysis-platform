# 成就系统模块

# 模拟用户数据存储
users = [
    {
        "id": 1,
        "username": "user1",
        "score": 0,
        "badges": [],
        "learning_progress": {}
    },
    {
        "id": 2,
        "username": "user2",
        "score": 0,
        "badges": [],
        "learning_progress": {}
    }
]

# 徽章定义
badges = [
    {
        "id": 1,
        "name": "初学者",
        "description": "完成第一个测评",
        "icon": "🌱",
        "condition": lambda user: len(user['learning_progress']) >= 1
    },
    {
        "id": 2,
        "name": "学习者",
        "description": "完成5个测评",
        "icon": "📚",
        "condition": lambda user: sum(len(assessments) for assessments in user['learning_progress'].values()) >= 5
    },
    {
        "id": 3,
        "name": "专家",
        "description": "完成10个测评",
        "icon": "🏆",
        "condition": lambda user: sum(len(assessments) for assessments in user['learning_progress'].values()) >= 10
    },
    {
        "id": 4,
        "name": "准确率大师",
        "description": "测评准确率达到80%以上",
        "icon": "🎯",
        "condition": lambda user: calculate_accuracy(user) >= 0.8
    }
]

# 计算用户测评准确率
def calculate_accuracy(user):
    total = 0
    correct = 0
    for assessments in user['learning_progress'].values():
        for assessment in assessments:
            total += 1
            if assessment.get('is_correct', False):
                correct += 1
    return correct / total if total > 0 else 0

# 获取用户信息
def get_user(user_id):
    for user in users:
        if user['id'] == user_id:
            return user
    return None

# 获取所有用户
def get_all_users():
    return users

# 增加用户积分
def add_score(user_id, points):
    user = get_user(user_id)
    if user:
        user['score'] += points
        check_badges(user)
        return True
    return False

# 记录学习进度
def record_progress(user_id, course_id, module_id, assessment_id, is_correct):
    user = get_user(user_id)
    if user:
        key = f"{course_id}_{module_id}"
        if key not in user['learning_progress']:
            user['learning_progress'][key] = []
        # 检查是否已经记录过这个测评
        existing = False
        for assessment in user['learning_progress'][key]:
            if assessment['assessment_id'] == assessment_id:
                existing = True
                break
        if not existing:
            user['learning_progress'][key].append({
                "assessment_id": assessment_id,
                "is_correct": is_correct,
                "timestamp": "2026-04-09"
            })
            # 根据是否正确发放不同积分
            points = 10 if is_correct else 5
            add_score(user_id, points)
        return True
    return False

# 检查并发放徽章
def check_badges(user):
    for badge in badges:
        if badge['id'] not in [b['id'] for b in user['badges']]:
            if badge['condition'](user):
                user['badges'].append({
                    "id": badge['id'],
                    "name": badge['name'],
                    "icon": badge['icon'],
                    "description": badge['description']
                })

# 获取用户徽章
def get_user_badges(user_id):
    user = get_user(user_id)
    if user:
        return user['badges']
    return []

# 获取排行榜
def get_leaderboard():
    sorted_users = sorted(users, key=lambda x: x['score'], reverse=True)
    return sorted_users

# 获取用户学习进度
def get_user_progress(user_id):
    user = get_user(user_id)
    if user:
        return user['learning_progress']
    return {}