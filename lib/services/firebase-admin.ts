import { initializeApp, cert, ServiceAccount, getApps } from "firebase-admin/app";

getApps().length === 0 && initializeApp({
  credential: cert({
    type: "service_account",
    project_id: "video-sync-9901a",
    private_key_id: "ba7ba77dec19d853525ab8220ca95f831a772958",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCi2fQ/5PQVbSBP\n/A0IKBpTPuSA+XmeQnBuwHywpk+Hx5IoMq9xMqCYfCAUpBH56pF+XadyXHdZt0pK\no+TkZFUmr2iF/L5AyyreaTO+BQBPyyL8vTFKf8pjTuwjD6/K1TECmXP7JkQhUw6T\nLUsi8KzfXs/CW31u91UXZoqgaYpUhKY9g8tsJpQqdozVqwJiBgY2rZQp0xgqOhNE\n8xQqptBNzeHEPAD3Evujj7mM8Bor487kPu1SButwMF0Bo4tnnBfu3u0fzs9ZrK1m\nWi/72qBT9WiZ1+MOo3HKSTxOlgvKuutQSljoCJuba4IK4LUu9ZZKbrorHejnrPEf\nkMD0CrZLAgMBAAECggEAAWNHHBZI6DfWWygkOkoRM11pWBoIKcuaJq94QI8iRV9z\nhOktqpLKYJJKObLOPml71O5aY3SbRcX0mZ88759VRG+hPecR/f5dPqj52mgzgPqT\nsUCxf1eIc4E0LPZQwrM/aCzDmsPQN9J74NA1gDY52ut1bMwXzQ7JiFoE22oa1i6J\nuzu8C3s+DyQbR8Kumupr7TroL0JwTsf2W9i+jcuBNxCRJQcFtmCiMjyVCyi852FP\nQ2ZwtrgLn8U9iKe90zCY537s5Id5qlKV4eMqbrWqojMkRNQputRwGa10OYbYhFuH\nElms+dZQlYo4EzNiAvb9p/MWMpjVTE8hULSqzpEITQKBgQDM4y+S4y4Q7okPA/q1\n20qhA2xJGAvhWjJHyg7QxOjmB4sBrYSacrVoyzVE7eF9OCRX1aMoH3JpRswjOnTj\nS7HePyXzpFX65ZjJgM9x1/f6vDjAcDgrtVZqH+Ur6scX0BVjyKBx8gIZtdcnPBk9\n3EgFkNEEpcJmR70SG6dKTLTGLwKBgQDLejOMjAw0N/Sh3LTxuV6lws0iqBE1y41Y\nhD2w7hSK5sp1BBNsSukdGnXUT2aXZcjLwmz225mfWkUlbax9Db24YhtYnXOy2xib\n8eVagG5K5YilbQkdVu6jOsCzHsqUFiDdEm/EznjoLhegDvhqGZwXg2rDMBYdfSI8\nI8bZyKQmpQKBgQDL6xVvYXJ44aBB9JjzpNVLGcgNm8Q/PvEqKD3EpSaTw1AjlFqV\nCbPqH83d09CIO3dYgEXJ6jqJ8y+7pDOwAad+5mTUcGwusZL2gqB00xl5URo+1bHi\nNrJSH3qM0jfjSHPxgz3FCrPyeNwxrYwF2JdKCs8ti/jGqYHRYvqGZX/KewKBgQDE\nl0ms1jaIUTO7Gzl7foTSlHaLsGQIXKUwy3urMSuJ1FfxXMHDVFEL/F+xhBFz3zR0\noWGT1DIFwzqhYehQXnFZ7vfK0z1QpdyN9tWIbiOhm0k9wy4WOcKQ1JgPt4U0NHkF\n/uUb+fzZHodW7n/WSu4DzcXd1dzYGulzv4FFM1RdvQKBgEjVGu1I9M7yXkPMn9WZ\nSttn06CsXckwmmpBAteafs50iIlyQL/XkC/czhY1imsIQMgYaEt9X/D+hB8csboc\nqLIcNnFXVeqF6+zoXVkMitbM7QwhQGlVxrQmCn8pyKt9RpldOKKymJc6kVwOwyP3\nLGyAcf+Fm4+kTqz7wJNQJ3x0\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-4bues@video-sync-9901a.iam.gserviceaccount.com",
    client_id: "116787407081127898636",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4bues%40video-sync-9901a.iam.gserviceaccount.com",
  } as ServiceAccount),
  databaseURL: "https://video-sync-9901a-default-rtdb.firebaseio.com",
});
